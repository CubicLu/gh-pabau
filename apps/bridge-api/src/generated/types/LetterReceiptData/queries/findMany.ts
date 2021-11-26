import { queryField, nonNull, list } from 'nexus'

export const LetterReceiptDataFindManyQuery = queryField(
  'findManyLetterReceiptData',
  {
    type: nonNull(list(nonNull('LetterReceiptData'))),
    args: {
      where: 'LetterReceiptDataWhereInput',
      orderBy: list('LetterReceiptDataOrderByWithRelationInput'),
      cursor: 'LetterReceiptDataWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LetterReceiptDataScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.letterReceiptData.findMany({
        ...args,
        ...select,
      })
    },
  },
)
