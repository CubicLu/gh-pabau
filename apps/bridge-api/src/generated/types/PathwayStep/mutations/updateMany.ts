import { mutationField, nonNull } from 'nexus'

export const PathwayStepUpdateManyMutation = mutationField(
  'updateManyPathwayStep',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PathwayStepUpdateManyMutationInput'),
      where: 'PathwayStepWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStep.updateMany(args as any)
    },
  },
)
