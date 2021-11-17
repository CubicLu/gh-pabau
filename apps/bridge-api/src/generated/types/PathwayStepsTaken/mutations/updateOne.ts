import { mutationField, nonNull } from 'nexus'

export const PathwayStepsTakenUpdateOneMutation = mutationField(
  'updateOnePathwayStepsTaken',
  {
    type: nonNull('PathwayStepsTaken'),
    args: {
      where: nonNull('PathwayStepsTakenWhereUniqueInput'),
      data: nonNull('PathwayStepsTakenUpdateInput'),
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
