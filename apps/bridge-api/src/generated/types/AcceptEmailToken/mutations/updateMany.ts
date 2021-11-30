import { mutationField, nonNull } from 'nexus'

export const AcceptEmailTokenUpdateManyMutation = mutationField(
  'updateManyAcceptEmailToken',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AcceptEmailTokenUpdateManyMutationInput'),
      where: 'AcceptEmailTokenWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.acceptEmailToken.updateMany(args as any)
    },
  },
)
