import { mutationField, nonNull } from 'nexus'

export const PathwayStepsTakenUpdateOneMutation = mutationField(
  'updateOnePathwayStepsTaken',
  {
    type: nonNull('PathwayStepsTaken'),
    args: {
      data: nonNull('PathwayStepsTakenUpdateInput'),
      where: nonNull('PathwayStepsTakenWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pathwayStepsTaken.update({
        where,
        data,
        ...select,
      })
    },
  },
)
