import { mutationField, nonNull } from 'nexus'

export const ActivityUpdateManyMutation = mutationField('updateManyActivity', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ActivityWhereInput',
    data: nonNull('ActivityUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.activity.updateMany(args as any)
  },
})
