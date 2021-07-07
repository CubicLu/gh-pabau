import { extendType, inputObjectType, intArg } from 'nexus'
import { Context } from '../../../context'
import { findManyFinanceCreditNote, creditNoteCount } from '../finance'
import { FindManyAccountCreditNoteResponse } from '../nexus-type'

export const FinanceCreditNoteWhereTnput = inputObjectType({
  name: 'FinanceCreditNoteWhereTnput',
  definition(t) {
    t.string('searchTerm')
    t.field('startDate', { type: 'DateTime' })
    t.field('endDate', { type: 'DateTime' })
    t.int('locationId')
    t.int('issuingCompanyId')
    t.string('creditNoteType')
  },
})

export const AccountCreditNoteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findManyAccountCreditNote', {
      type: FindManyAccountCreditNoteResponse,
      description:
        'Retrieve list of account credit notes based on company and location',
      args: {
        where: 'FinanceCreditNoteWhereTnput',
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_root, input, ctx: Context) {
        try {
          return findManyFinanceCreditNote(
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
    t.field('accountCreditNoteCount', {
      type: 'Int',
      args: {
        where: 'FinanceCreditNoteWhereTnput',
      },
      description:
        'Retrieve total count of account credit note based on company and location',
      async resolve(_root, input, ctx: Context) {
        try {
          const data = await creditNoteCount(ctx, input.where)
          return data.length
        } catch (error) {
          return error
        }
      },
    })
  },
})
