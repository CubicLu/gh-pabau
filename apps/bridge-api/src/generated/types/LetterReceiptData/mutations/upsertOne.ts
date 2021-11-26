import { mutationField, nonNull } from 'nexus'

export const LetterReceiptDataUpsertOneMutation = mutationField(
  'upsertOneLetterReceiptData',
  {
    type: nonNull('LetterReceiptData'),
    args: {
      where: nonNull('LetterReceiptDataWhereUniqueInput'),
      create: nonNull('LetterReceiptDataCreateInput'),
      update: nonNull('LetterReceiptDataUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.letterReceiptData.upsert({
        ...args,
        ...select,
      })
    },
  },
)
