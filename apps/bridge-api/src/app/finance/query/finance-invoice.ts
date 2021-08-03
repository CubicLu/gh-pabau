import { extendType, intArg, stringArg, arg, nonNull } from 'nexus'
import { Context } from '../../../context'
import {
  findManyFinanceInvoice,
  invoiceCount,
  getInvoiceData,
  getStatementData,
} from '../finance'
import {
  FinanceInvoiceResponse,
  InvSaleData,
  StatementSaleData,
} from '../nexus-type'
import { InvoiceArgs, StatementArgs } from '../types/index'

const dateArg = (options) => arg({ type: 'DateTime', ...options })
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
        saleId: nonNull(intArg()),
      },
      async resolve(_, args: InvoiceArgs, ctx: Context) {
        if (!args.guid && !args.saleId) {
          throw new Error('can not be nullable, must required guid or sale id')
        }
        return await getInvoiceData(ctx, args)
      },
    })
    t.field('getStatementData', {
      type: StatementSaleData,
      args: {
        locationId: intArg(),
        customerId: nonNull(intArg()),
        statementPeriodFrom: dateArg(stringArg()),
        statementPeriodTo: dateArg(stringArg()),
      },
      async resolve(_, args: StatementArgs, ctx: Context) {
        if (
          !args.locationId &&
          !args.customerId &&
          !args.statementPeriodFrom &&
          !args.statementPeriodTo
        ) {
          throw new Error(
            'can not be nullable, must required location id or customer id or statementPeriod(From-To)'
          )
        }
        return await getStatementData(ctx, args)
      },
    })
  },
})
