import { mutationField, nonNull } from 'nexus'

export const PathwayStepCreateOneMutation = mutationField(
  'createOnePathwayStep',
  {
    type: nonNull('PathwayStep'),
    args: {
      data: nonNull('PathwayStepCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pathwayStep.create({
        data,
        ...select,
      })
    },
  },
)
