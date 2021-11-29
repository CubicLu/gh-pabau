import { mutationField, nonNull } from 'nexus'

export const PathwayUpdateManyMutation = mutationField('updateManyPathway', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('PathwayUpdateManyMutationInput'),
    where: 'PathwayWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pathway.updateMany(args as any)
  },
})
