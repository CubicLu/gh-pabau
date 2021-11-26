import { queryField, list } from 'nexus'

export const LetterReceiptDataAggregateQuery = queryField(
  'aggregateLetterReceiptData',
  {
    type: 'AggregateLetterReceiptData',
    args: {
      where: 'LetterReceiptDataWhereInput',
      orderBy: list('LetterReceiptDataOrderByWithRelationInput'),
      cursor: 'LetterReceiptDataWhereUniqueInput',
      distinct: 'LetterReceiptDataScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.letterReceiptData.aggregate({ ...args, ...select }) as any
    },
  },
)
