import { mutationField, nonNull } from 'nexus'

export const LetterReceiptDataUpdateOneMutation = mutationField(
  'updateOneLetterReceiptData',
  {
    type: nonNull('LetterReceiptData'),
    args: {
      data: nonNull('LetterReceiptDataUpdateInput'),
      where: nonNull('LetterReceiptDataWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.letterReceiptData.update({
        where,
        data,
        ...select,
      })
    },
  },
)
