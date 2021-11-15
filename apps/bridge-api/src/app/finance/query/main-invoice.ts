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
    t.string('reference_no')
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
        const query = generateInvoiceQuery(ctx, input, [
          "a.reference_no!='**REFUND**' ",
        ])
        return await ctx.prisma.$queryRaw(query)
      },
    })
    t.list.field('findManyCreditNote', {
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
        const query = generateInvoiceQuery(ctx, input, [
          "a.reference_no='**CREDIT NOTE**'",
        ])
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
        const query = generateInvoiceCountQuery(ctx, input, [
          "a.reference_no!='**REFUND**' ",
        ])
        const invoices = await ctx.prisma.$queryRaw(query)

        return invoices[0]?.count ?? 0
      },
    })
    t.field('countCreditNote', {
      type: 'Int',
      description: 'Real count of creditNotes',
      args: {
        where: 'InvSaleWhereInput',
        cursor: 'InvSaleWhereUniqueInput',
      },
      async resolve(_root, input, ctx: Context) {
        const query = generateInvoiceCountQuery(ctx, input, [
          "a.reference_no='**CREDIT NOTE**'",
        ])
        const invoices = await ctx.prisma.$queryRaw(query)

        return invoices[0]?.count ?? 0
      },
    })
  },
})

const generateInvoiceQuery = (
  ctx: Context,
  input: any,
  whereClause: Array<string> = []
) => {
  whereClause.push(`a.occupier = ${ctx.authenticated.company}`)
  if (input?.where?.customer_id?.equals)
    whereClause.push(`a.customer_id = ${input.where.customer_id.equals}`)
  if (input?.where?.custom_id?.equals)
    whereClause.push(`a.custom_id = ${input.where.custom_id.equals}`)
  if (input?.cursor) whereClause.push(` a.id > ${input?.cursor}`)

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
              sum(a.credit_amount) as credit_amount,
              b.name as location_name,
              group_concat(Distinct d.name) as billers,
              if(e.id is null, concat(fname,' ',lname),e.insurer_name) as issue_to
          FROM inv_sales a
              LEFT JOIN company_branches b on b.id = a.location_id
              LEFT JOIN cm_contacts c on c.id = a.customer_id
              LEFT JOIN inv_billers d ON a.biller_id=d.id
              LEFT JOIN insurance_details e ON a.insurer_contract_id=e.id
          WHERE 
              ${whereClause.join(' AND ')}
              AND a.guid!='' AND a.guid IS NOT NULL
          GROUP BY IFNULL(a.guid, a.id)
          ORDER BY a.date desc
          LIMIT ${input.take} 
          OFFSET ${input.skip}`
  return query
}

const generateInvoiceCountQuery = (
  ctx: Context,
  input: any,
  whereClause: Array<string> = []
) => {
  whereClause.push(`a.occupier = ${ctx.authenticated.company}`)
  if (input?.where?.customer_id?.equals)
    whereClause.push(`a.customer_id = ${input.where.customer_id.equals}`)
  if (input?.where?.custom_id?.equals)
    whereClause.push(`a.custom_id = ${input.where.custom_id.equals}`)
  if (input?.cursor) whereClause.push(` a.id > ${input?.cursor}`)

  const query = `SELECT count(DISTINCT a.guid) as count
          from inv_sales a
          WHERE  
          ${whereClause.join(' AND ')}
          AND a.guid!='' AND a.guid IS NOT NULL`

  return query
}
