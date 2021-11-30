import { queryField, list } from 'nexus'

export const CreditNoteTypeAggregateQuery = queryField(
  'aggregateCreditNoteType',
  {
    type: 'AggregateCreditNoteType',
    args: {
      where: 'CreditNoteTypeWhereInput',
      orderBy: list('CreditNoteTypeOrderByWithRelationInput'),
      cursor: 'CreditNoteTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditNoteType.aggregate({ ...args, ...select }) as any
    },
  },
)
