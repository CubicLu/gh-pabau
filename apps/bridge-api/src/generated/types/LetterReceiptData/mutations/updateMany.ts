import { mutationField, nonNull } from 'nexus'

export const LetterReceiptDataUpdateManyMutation = mutationField(
  'updateManyLetterReceiptData',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LetterReceiptDataUpdateManyMutationInput'),
      where: 'LetterReceiptDataWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.letterReceiptData.updateMany(args as any)
    },
  },
)
