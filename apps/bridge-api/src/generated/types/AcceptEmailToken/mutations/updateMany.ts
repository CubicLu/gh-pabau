import { mutationField, nonNull } from 'nexus'

export const AcceptEmailTokenUpdateManyMutation = mutationField(
  'updateManyAcceptEmailToken',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AcceptEmailTokenWhereInput',
      data: nonNull('AcceptEmailTokenUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.acceptEmailToken.updateMany(args as any)
    },
  },
)
