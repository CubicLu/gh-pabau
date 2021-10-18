import { mutationField, nonNull } from 'nexus'

export const PathwaysUpdateManyMutation = mutationField('updateManyPathways', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PathwaysWhereInput',
    data: nonNull('PathwaysUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pathways.updateMany(args as any)
  },
})
