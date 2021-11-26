import { mutationField, nonNull } from 'nexus'

export const LetterReceiptDataDeleteOneMutation = mutationField(
  'deleteOneLetterReceiptData',
  {
    type: 'LetterReceiptData',
    args: {
      where: nonNull('LetterReceiptDataWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.letterReceiptData.delete({
        where,
        ...select,
      })
    },
  },
)
