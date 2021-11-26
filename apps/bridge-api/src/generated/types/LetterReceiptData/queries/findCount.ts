import { queryField, nonNull, list } from 'nexus'

export const LetterReceiptDataFindCountQuery = queryField(
  'findManyLetterReceiptDataCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LetterReceiptDataWhereInput',
      orderBy: list('LetterReceiptDataOrderByWithRelationInput'),
      cursor: 'LetterReceiptDataWhereUniqueInput',
      distinct: 'LetterReceiptDataScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.letterReceiptData.count(args as any)
    },
  },
)
