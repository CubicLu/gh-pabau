import { extendType, inputObjectType, intArg } from 'nexus'
import { Context } from '../../../context'
import { findManyFinanceDebt, debtCount } from '../finance'
import { FindManyAccountDebtResponse } from '../nexus-type'

export const FinanceWhereInput = inputObjectType({
  name: 'FinanceWhereInput',
  definition(t) {
    t.string('searchTerm')
    t.field('startDate', { type: 'DateTime' })
    t.field('endDate', { type: 'DateTime' })
    t.int('locationId')
    t.int('issuingCompanyId')
  },
})

export const AccountDebtQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyAccountDebt', {
      type: FindManyAccountDebtResponse,
      description:
        'Retrieve list of account debt based on company and location',
      args: {
        where: 'FinanceWhereInput',
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_root, input, ctx: Context) {
        try {
          return findManyFinanceDebt(ctx, input.where, input.skip, input.take)
        } catch (error) {
          return error
        }
      },
    })
    t.field('accountDebtCount', {
      type: 'Int',
      args: {
        where: 'FinanceWhereInput',
      },
      description:
        'Retrieve total count of account debt based on company and location',
      async resolve(_root, input, ctx: Context) {
        try {
          const data = await debtCount(ctx, input.where)
          return data.length
        } catch (error) {
          return error
        }
      },
    })
  },
})
