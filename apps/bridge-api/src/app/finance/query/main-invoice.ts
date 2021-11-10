import { Prisma } from '@prisma/client'
import { extendType, intArg, list, objectType } from 'nexus'
import { Context } from '../../../context'

export const InvoiceData = objectType({
  name: 'InvoiceData',
  description: 'Invoice data simple response',
  definition(t) {
    t.int('id')
    t.string('guid')
    t.field('date', { type: 'DateTime' })
    t.int('customer_id')
    t.string('customer_name')
    t.float('paid_amount')
    t.float('discount_amount')
    t.float('inv_total')
    t.string('location_name')
    t.string('billers')
    t.string('issue_to')
  },
})

export const MainInvoice = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyInvoice', {
      type: InvoiceData,
      description:
        'Get Invoices per customer or invoice no (custom_id), other field to be implemented',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: list('InvSaleOrderByWithRelationInput'),
        cursor: 'InvSaleWhereUniqueInput',
        skip: intArg({
          default: 0,
        }),
        take: intArg({
          default: 50,
        }),
      },
      async resolve(_root, input, ctx: Context) {
        const query = generateInvoiceQuery(ctx, input)
        // console.info('query:', query)
        return await ctx.prisma.$queryRaw(query)
      },
    })
    t.field('countInvoice', {
      type: 'Int',
      description: 'Real count of invoices',
      args: {
        where: 'InvSaleWhereInput',
        cursor: 'InvSaleWhereUniqueInput',
      },
      async resolve(_root, input, ctx: Context) {
        const invoices = await ctx.prisma.$queryRaw`SELECT 
              count(DISTINCT a.guid) as count
          FROM inv_sales a
          WHERE a.occupier = ${ctx.authenticated.company}
              ${
                input?.where?.customer_id?.equals ??
                Prisma.sql`AND a.customer_id = ${input.where.customer_id.equals}`
              }
              ${
                input?.where?.custom_id?.equals
                  ? Prisma.sql`AND a.custom_id = ${input.where.custom_id.equals}`
                  : Prisma.empty
              }
              AND a.guid!='' AND a.guid IS NOT NULL
              AND a.reference_no!='**CREDIT NOTE**' AND a.reference_no!='**REFUND**'`

        return invoices[0]?.count ?? 0
      },
    })
    // t.list.field('findManyInvoiceTest', {
    //   type: 'InvSale',
    //   description: 'Get invoice per contact',
    //   args: {
    //     where: 'InvSaleWhereInput',
    //     skip: intArg({
    //       default: 0,
    //     }),
    //     take: intArg({
    //       default: 50,
    //     }),
    //   },
    //   async resolve(_root, input, ctx: Context) {
    //     const start = Date.now()
    //     let invoices = []
    //     let skip = 0
    //     while (invoices.length < input.take + input.skip) {
    //       const data = await ctx.prisma.invSale.findMany({
    //         where: {
    //           ...input.where,
    //           company_id: ctx.authenticated.company,
    //         },
    //         take: input.take,
    //         skip: skip,
    //       })
    //       if (data.length === 0) break
    //       const count = invoices.length
    //       if (
    //         count > 0 &&
    //         data.length > 0 &&
    //         invoices[count - 1].guid === data[0].guid
    //       ) {
    //         // console.info('first duplicate found:', invoices.length)
    //         invoices[count - 1].paid_amount += data[0].paid_amount
    //         invoices[count - 1].inv_total += data[0].inv_total
    //         invoices[count - 1].total += data[0].total
    //         data.splice(0, 1)
    //       }
    //       // console.info('start of loop:')
    //       for (let i = 1; i < data.length; i++) {
    //         // console.info(data[i].guid)
    //         if (data[i].guid === data[i - 1].guid) {
    //           data[i - 1].paid_amount += data[i].paid_amount
    //           data[i - 1].inv_total += data[i].inv_total
    //           data[i - 1].total += data[i].total
    //           data.splice(i, 1)
    //           i -= 1
    //         }
    //       }
    //       invoices = [...invoices, ...data]
    //       skip += input.take
    //     }
    //     console.info(
    //       'Resolver with loop:',
    //       'contact',
    //       input.where.customer_id.equals,
    //       'skip:',
    //       input.skip,
    //       'take:',
    //       input.take,
    //       'length:',
    //       invoices.length,
    //       'time:',
    //       (Date.now() - start) / 1000
    //     )
    //     return invoices.slice(input.skip, input.skip + input.take)
    //   },
    // })
  },
})

const generateInvoiceQuery = (ctx: Context, input: any) => {
  const whereClause = []
  if (input?.where?.customer_id?.equals)
    whereClause.push(`AND a.customer_id = ${input.where.customer_id.equals}`)
  if (input?.where?.custom_id?.equals)
    whereClause.push(`AND a.custom_id = ${input.where.custom_id.equals}`)
  if (input?.cursor) whereClause.push(`AND a.id > ${input?.cursor}`)

  const query = `SELECT 
              max(a.id) as id,
              a.guid, 
              a.date,
              a.customer_id, 
              a.customer_name,
              a.custom_id,
              sum(a.paid_amount) as paid_amount,
              sum(a.discount_amount) as discount_amount,
              sum(a.inv_total) as inv_total,
              b.name as location_name,
              group_concat(Distinct d.name) as billers,
              if(e.id is null, concat(fname,' ',lname),e.insurer_name) as issue_to
          FROM inv_sales a
              LEFT JOIN company_branches b on b.id = a.location_id
              LEFT JOIN cm_contacts c on c.id = a.customer_id
              LEFT JOIN inv_billers d ON a.biller_id=d.id
              LEFT JOIN insurance_details e ON a.insurer_contract_id=e.id
          WHERE a.occupier = ${ctx.authenticated.company}
              ${whereClause.join(' ')}
              AND a.guid!='' AND a.guid IS NOT NULL
              AND a.reference_no!='**CREDIT NOTE**' AND a.reference_no!='**REFUND**'
          GROUP BY IFNULL(a.guid, a.id)
          ORDER BY a.date desc
          LIMIT ${input.take} 
          OFFSET ${input.skip}`

  return query
}
