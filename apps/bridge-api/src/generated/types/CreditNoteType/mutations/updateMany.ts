import { mutationField, nonNull } from 'nexus'

export const CreditNoteTypeUpdateManyMutation = mutationField(
  'updateManyCreditNoteType',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CreditNoteTypeUpdateManyMutationInput'),
      where: 'CreditNoteTypeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.creditNoteType.updateMany(args as any)
    },
  },
)
