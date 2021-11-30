import { mutationField, nonNull } from 'nexus'

export const InvBillerUpdateManyMutation = mutationField(
  'updateManyInvBiller',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvBillerUpdateManyMutationInput'),
      where: 'InvBillerWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invBiller.updateMany(args as any)
    },
  },
)
