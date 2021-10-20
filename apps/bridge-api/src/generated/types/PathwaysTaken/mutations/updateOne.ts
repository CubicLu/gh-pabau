import { mutationField, nonNull } from 'nexus'

export const PathwaysTakenUpdateOneMutation = mutationField(
  'updateOnePathwaysTaken',
  {
    type: nonNull('PathwaysTaken'),
    args: {
      where: nonNull('PathwaysTakenWhereUniqueInput'),
      data: nonNull('PathwaysTakenUpdateInput'),
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
