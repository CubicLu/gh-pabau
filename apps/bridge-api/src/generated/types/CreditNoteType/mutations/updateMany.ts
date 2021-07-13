import { mutationField, nonNull } from 'nexus'

export const CreditNoteTypeUpdateManyMutation = mutationField(
  'updateManyCreditNoteType',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CreditNoteTypeWhereInput',
      data: nonNull('CreditNoteTypeUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.creditNoteType.updateMany(args as any)
    },
  },
)
