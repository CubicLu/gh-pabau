import { extendType, intArg, stringArg } from 'nexus'
import { Context } from '../../../context'
import {
  findManyFinanceInvoice,
  invoiceCount,
  getInvoiceData,
} from '../finance'
import { FinanceInvoiceResponse, InvSaleData } from '../nexus-type'
import { InvoiceArgs } from '../types/index'

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
    t.field('getInvoiceData', {
      type: InvSaleData,
      args: {
        guid: stringArg(),
        saleId: intArg(),
      },
      async resolve(_, args: InvoiceArgs, ctx: Context) {
        if (!args.guid && !args.saleId) {
          throw new Error('can not be nullable, must required guid or sale id')
        }
        return await getInvoiceData(ctx, args)
      },
    })
  },
})
