import { mutationField, nonNull } from 'nexus'

export const InvBillerUpdateManyMutation = mutationField(
  'updateManyInvBiller',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvBillerWhereInput',
      data: nonNull('InvBillerUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invBiller.updateMany(args as any)
    },
  },
)
