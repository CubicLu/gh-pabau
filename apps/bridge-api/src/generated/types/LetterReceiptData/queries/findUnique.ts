import { queryField, nonNull } from 'nexus'

export const LetterReceiptDataFindUniqueQuery = queryField(
  'findUniqueLetterReceiptData',
  {
    type: 'LetterReceiptData',
    args: {
      where: nonNull('LetterReceiptDataWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.letterReceiptData.findUnique({
        where,
        ...select,
      })
    },
  },
)
