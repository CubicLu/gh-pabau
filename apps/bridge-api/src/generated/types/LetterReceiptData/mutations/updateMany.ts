import { mutationField, nonNull } from 'nexus'

export const LetterReceiptDataUpdateManyMutation = mutationField(
  'updateManyLetterReceiptData',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LetterReceiptDataWhereInput',
      data: nonNull('LetterReceiptDataUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.letterReceiptData.updateMany(args as any)
    },
  },
)
