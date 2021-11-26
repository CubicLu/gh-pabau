import { mutationField, nonNull } from 'nexus'

export const LetterReceiptDataUpdateOneMutation = mutationField(
  'updateOneLetterReceiptData',
  {
    type: nonNull('LetterReceiptData'),
    args: {
      where: nonNull('LetterReceiptDataWhereUniqueInput'),
      data: nonNull('LetterReceiptDataUpdateInput'),
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
