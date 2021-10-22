import { mutationField, nonNull } from 'nexus'

export const PathwayStepUpdateManyMutation = mutationField(
  'updateManyPathwayStep',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PathwayStepWhereInput',
      data: nonNull('PathwayStepUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStep.updateMany(args as any)
    },
  },
)
