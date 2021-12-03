import { mutationField, nonNull } from 'nexus'

export const ActivityUpdateManyMutation = mutationField('updateManyActivity', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('ActivityUpdateManyMutationInput'),
    where: 'ActivityWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.activity.updateMany(args as any)
  },
})
