import { queryField, list } from 'nexus'

export const LetterReceiptDataFindFirstQuery = queryField(
  'findFirstLetterReceiptData',
  {
    type: 'LetterReceiptData',
    args: {
      where: 'LetterReceiptDataWhereInput',
      orderBy: list('LetterReceiptDataOrderByWithRelationInput'),
      cursor: 'LetterReceiptDataWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LetterReceiptDataScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.letterReceiptData.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
