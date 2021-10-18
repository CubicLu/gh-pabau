import { mutationField, nonNull } from 'nexus'

export const PathwayStepsUpdateOneMutation = mutationField(
  'updateOnePathwaySteps',
  {
    type: nonNull('PathwaySteps'),
    args: {
      where: nonNull('PathwayStepsWhereUniqueInput'),
      data: nonNull('PathwayStepsUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pathwaySteps.update({
        where,
        data,
        ...select,
      })
    },
  },
)
