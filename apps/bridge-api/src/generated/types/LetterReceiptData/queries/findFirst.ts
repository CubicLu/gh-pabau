import { queryField, list } from 'nexus'

export const LetterReceiptDataFindFirstQuery = queryField(
  'findFirstLetterReceiptData',
  {
    type: 'LetterReceiptData',
    args: {
      where: 'LetterReceiptDataWhereInput',
      orderBy: list('LetterReceiptDataOrderByWithRelationInput'),
      cursor: 'LetterReceiptDataWhereUniqueInput',
      distinct: 'LetterReceiptDataScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.letterReceiptData.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
