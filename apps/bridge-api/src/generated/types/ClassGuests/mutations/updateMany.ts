import { mutationField, nonNull } from 'nexus'

export const ClassGuestsUpdateManyMutation = mutationField(
  'updateManyClassGuests',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClassGuestsWhereInput',
      data: nonNull('ClassGuestsUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classGuests.updateMany(args as any)
    },
  },
)
