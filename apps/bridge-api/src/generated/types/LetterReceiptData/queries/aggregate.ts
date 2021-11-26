import { queryField, list } from 'nexus'

export const LetterReceiptDataAggregateQuery = queryField(
  'aggregateLetterReceiptData',
  {
    type: 'AggregateLetterReceiptData',
    args: {
      where: 'LetterReceiptDataWhereInput',
      orderBy: list('LetterReceiptDataOrderByWithRelationInput'),
      cursor: 'LetterReceiptDataWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.letterReceiptData.aggregate({ ...args, ...select }) as any
    },
  },
)
