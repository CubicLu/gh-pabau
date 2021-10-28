import { mutationField, nonNull } from 'nexus'

export const PathwayUpdateManyMutation = mutationField('updateManyPathway', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PathwayWhereInput',
    data: nonNull('PathwayUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pathway.updateMany(args as any)
  },
})
