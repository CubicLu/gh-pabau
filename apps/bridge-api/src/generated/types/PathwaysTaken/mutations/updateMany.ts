import { mutationField, nonNull } from 'nexus'

export const PathwaysTakenUpdateManyMutation = mutationField(
  'updateManyPathwaysTaken',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PathwaysTakenUpdateManyMutationInput'),
      where: 'PathwaysTakenWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwaysTaken.updateMany(args as any)
    },
  },
)
