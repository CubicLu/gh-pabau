import { mutationField, nonNull } from 'nexus'

export const PathwaysTakenUpdateManyMutation = mutationField(
  'updateManyPathwaysTaken',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PathwaysTakenWhereInput',
      data: nonNull('PathwaysTakenUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwaysTaken.updateMany(args as any)
    },
  },
)
