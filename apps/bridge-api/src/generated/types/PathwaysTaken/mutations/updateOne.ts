import { mutationField, nonNull } from 'nexus'

export const PathwaysTakenUpdateOneMutation = mutationField(
  'updateOnePathwaysTaken',
  {
    type: nonNull('PathwaysTaken'),
    args: {
      data: nonNull('PathwaysTakenUpdateInput'),
      where: nonNull('PathwaysTakenWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pathwaysTaken.update({
        where,
        data,
        ...select,
      })
    },
  },
)
