import { mutationField, nonNull } from 'nexus'

export const PathwayStepsTakenUpdateManyMutation = mutationField(
  'updateManyPathwayStepsTaken',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PathwayStepsTakenUpdateManyMutationInput'),
      where: 'PathwayStepsTakenWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStepsTaken.updateMany(args as any)
    },
  },
)
