import { mutationField, nonNull } from 'nexus'

export const PathwayStepsTakenUpdateManyMutation = mutationField(
  'updateManyPathwayStepsTaken',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PathwayStepsTakenWhereInput',
      data: nonNull('PathwayStepsTakenUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStepsTaken.updateMany(args as any)
    },
  },
)
