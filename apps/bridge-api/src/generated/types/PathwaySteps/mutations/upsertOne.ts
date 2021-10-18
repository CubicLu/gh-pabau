import { mutationField, nonNull } from 'nexus'

export const PathwayStepsUpsertOneMutation = mutationField(
  'upsertOnePathwaySteps',
  {
    type: nonNull('PathwaySteps'),
    args: {
      where: nonNull('PathwayStepsWhereUniqueInput'),
      create: nonNull('PathwayStepsCreateInput'),
      update: nonNull('PathwayStepsUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwaySteps.upsert({
        ...args,
        ...select,
      })
    },
  },
)
