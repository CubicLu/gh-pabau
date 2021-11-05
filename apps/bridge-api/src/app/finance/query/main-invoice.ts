import { InvSale, Prisma } from '.prisma/client'
import { extendType, intArg } from 'nexus'
import { Context } from '../../../context'

export const MainInvoice = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyInvoiceTest', {
      type: 'InvSale',
      description: 'Get invoice per contact',
      args: {
        where: 'InvSaleWhereInput',
        skip: intArg({
          default: 0,
        }),
        take: intArg({
          default: 50,
        }),
      },
      async resolve(_root, input, ctx: Context) {
        const start = Date.now()
        let invoices = []
        let skip = 0

        while (invoices.length < input.take + input.skip) {
          const data = await ctx.prisma.invSale.findMany({
            where: {
              ...input.where,
              company_id: ctx.authenticated.company,
            },
            take: input.take,
            skip: skip,
          })

          if (data.length === 0) break

          const count = invoices.length
          if (
            count > 0 &&
            data.length > 0 &&
            invoices[count - 1].guid === data[0].guid
          ) {
            // console.info('first duplicate found:', invoices.length)
            invoices[count - 1].paid_amount += data[0].paid_amount
            invoices[count - 1].inv_total += data[0].inv_total
            invoices[count - 1].total += data[0].total
            data.splice(0, 1)
          }
          // console.info('start of loop:')
          for (let i = 1; i < data.length; i++) {
            // console.info(data[i].guid)
            if (data[i].guid === data[i - 1].guid) {
              data[i - 1].paid_amount += data[i].paid_amount
              data[i - 1].inv_total += data[i].inv_total
              data[i - 1].total += data[i].total
              data.splice(i, 1)
              i -= 1
            }
          }

          invoices = [...invoices, ...data]
          skip += input.take
        }
        console.info(
          'Resolver with loop:',
          'contact',
          input.where.customer_id.equals,
          'skip:',
          input.skip,
          'take:',
          input.take,
          'length:',
          invoices.length,
          'time:',
          (Date.now() - start) / 1000
        )
        return invoices.slice(input.skip, input.skip + input.take)
      },
    })
    t.list.field('findManyInvoiceTestRaw', {
      type: 'InvSale',
      description: 'Get invoice per contact with Raw',
      args: {
        where: 'InvSaleWhereInput',
        skip: intArg({
          default: 0,
        }),
        take: intArg({
          default: 50,
        }),
      },
      async resolve(_root, input, ctx: Context) {
        const start = Date.now()
        // console.info('where', input.where.customer_id.equals)
        const invoices = await ctx.prisma.$queryRaw<
          InvSale[]
        >`SELECT sales.id, sales.date,sales.customer_id, sales.customer_name
        FROM inv_sales AS sales
        LEFT JOIN company_branches AS loc ON loc.id = sales.location_id
        LEFT JOIN cm_contacts AS cmContact ON cmContact.id = sales.customer_id
        WHERE sales.occupier = ${ctx.authenticated.company}
        ${
          input.where.customer_id.equals
            ? Prisma.sql`AND sales.customer_id = ${input.where.customer_id.equals}`
            : Prisma.empty
        }
        AND sales.guid!='' AND sales.guid IS NOT NULL
        AND sales.reference_no!='**CREDIT NOTE**' AND sales.reference_no!='**REFUND**'
        GROUP BY IFNULL(sales.guid, sales.id)
        LIMIT ${input.take} OFFSET ${input.skip} 
        `
        console.info(
          'Resolver with raw:',
          'contact',
          input.where.customer_id.equals,
          'skip:',
          input.skip,
          'take:',
          input.take,
          'length:',
          invoices.length,
          'time:',
          (Date.now() - start) / 1000
        )

        return invoices
      },
    })
  },
})
