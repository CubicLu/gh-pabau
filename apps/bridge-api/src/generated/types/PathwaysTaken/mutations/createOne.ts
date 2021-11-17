import { mutationField, nonNull } from 'nexus'

export const PathwaysTakenCreateOneMutation = mutationField(
  'createOnePathwaysTaken',
  {
    type: nonNull('PathwaysTaken'),
    args: {
      data: nonNull('PathwaysTakenCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pathwaysTaken.create({
        data,
        ...select,
      })
    },
  },
)
