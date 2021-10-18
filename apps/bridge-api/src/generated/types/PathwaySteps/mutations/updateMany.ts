import { mutationField, nonNull } from 'nexus'

export const PathwayStepsUpdateManyMutation = mutationField(
  'updateManyPathwaySteps',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PathwayStepsWhereInput',
      data: nonNull('PathwayStepsUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwaySteps.updateMany(args as any)
    },
  },
)
