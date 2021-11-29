import { mutationField, nonNull } from 'nexus'

export const PathwayStepUpdateOneMutation = mutationField(
  'updateOnePathwayStep',
  {
    type: nonNull('PathwayStep'),
    args: {
      data: nonNull('PathwayStepUpdateInput'),
      where: nonNull('PathwayStepWhereUniqueInput'),
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
