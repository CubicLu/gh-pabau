import { extendType, intArg } from 'nexus'
import { Context } from '../../../context'
import { findManyFinancePayment, paymentCount } from '../finance'
import { FindManyAccountPaymentResponse } from '../nexus-type'

export const AccountPaymentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyAccountPayment', {
      type: FindManyAccountPaymentResponse,
      description:
        'Retrieve list of account payment based on company and location',
      args: {
        where: 'FinanceWhereInput',
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_root, input, ctx: Context) {
        try {
          return findManyFinancePayment(
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
    t.field('accountPaymentCount', {
      type: 'Int',
      args: {
        where: 'FinanceWhereInput',
      },
      description:
        'Retrieve total count of account payment based on company and location',
      async resolve(_root, input, ctx: Context) {
        try {
          const data = await paymentCount(ctx, input.where)
          return data.length
        } catch (error) {
          return error
        }
      },
    })
  },
})
