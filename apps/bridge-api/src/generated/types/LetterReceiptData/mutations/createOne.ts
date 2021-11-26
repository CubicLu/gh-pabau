import { mutationField, nonNull } from 'nexus'

export const LetterReceiptDataCreateOneMutation = mutationField(
  'createOneLetterReceiptData',
  {
    type: nonNull('LetterReceiptData'),
    args: {
      data: nonNull('LetterReceiptDataCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.letterReceiptData.create({
        data,
        ...select,
      })
    },
  },
)
