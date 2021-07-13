import { extendType, intArg } from 'nexus'
import { Context } from '../../../context'
import { findManyFinanceInvoice, invoiceCount } from '../finance'
import { FinanceInvoiceResponse } from '../nexus-type'

export const AccountInvoiceQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyAccountInvoice', {
      type: FinanceInvoiceResponse,
      description:
        'Retrieve list of account invoices based on company and location',
      args: {
        where: 'FinanceWhereInput',
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_root, input, ctx: Context) {
        try {
          return findManyFinanceInvoice(
            ctx,
            input.where,
            input.skip,
            input.take
          )
        } catch (error) {
          return error
        }
      },
    })
    t.field('accountInvoiceCount', {
      type: 'Int',
      args: {
        where: 'FinanceWhereInput',
      },
      description:
        'Retrieve total count of account invoices based on company and location',
      async resolve(_root, input, ctx: Context) {
        try {
          const data = await invoiceCount(ctx, input.where)
          return data.length
        } catch (error) {
          return error
        }
      },
    })
  },
})
