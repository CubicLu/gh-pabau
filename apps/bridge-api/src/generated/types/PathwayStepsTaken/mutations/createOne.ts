import { mutationField, nonNull } from 'nexus'

export const PathwayStepsTakenCreateOneMutation = mutationField(
  'createOnePathwayStepsTaken',
  {
    type: nonNull('PathwayStepsTaken'),
    args: {
      data: nonNull('PathwayStepsTakenCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pathwayStepsTaken.create({
        data,
        ...select,
      })
    },
  },
)
