import { mutationField, nonNull } from 'nexus'

export const PathwayStepUpdateOneMutation = mutationField(
  'updateOnePathwayStep',
  {
    type: nonNull('PathwayStep'),
    args: {
      where: nonNull('PathwayStepWhereUniqueInput'),
      data: nonNull('PathwayStepUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pathwayStep.update({
        where,
        data,
        ...select,
      })
    },
  },
)
