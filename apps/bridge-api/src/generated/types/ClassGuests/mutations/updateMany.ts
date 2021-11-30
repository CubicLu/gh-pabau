import { mutationField, nonNull } from 'nexus'

export const ClassGuestsUpdateManyMutation = mutationField(
  'updateManyClassGuests',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClassGuestsUpdateManyMutationInput'),
      where: 'ClassGuestsWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classGuests.updateMany(args as any)
    },
  },
)
