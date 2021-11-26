import { queryField, nonNull, list } from 'nexus'

export const LetterReceiptDataFindCountQuery = queryField(
  'findManyLetterReceiptDataCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LetterReceiptDataWhereInput',
      orderBy: list('LetterReceiptDataOrderByWithRelationInput'),
      cursor: 'LetterReceiptDataWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LetterReceiptDataScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.letterReceiptData.count(args as any)
    },
  },
)
