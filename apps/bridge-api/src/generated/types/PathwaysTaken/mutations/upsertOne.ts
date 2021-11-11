import { mutationField, nonNull } from 'nexus'

export const PathwaysTakenUpsertOneMutation = mutationField(
  'upsertOnePathwaysTaken',
  {
    type: nonNull('PathwaysTaken'),
    args: {
      where: nonNull('PathwaysTakenWhereUniqueInput'),
      create: nonNull('PathwaysTakenCreateInput'),
      update: nonNull('PathwaysTakenUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwaysTaken.upsert({
        ...args,
        ...select,
      })
    },
  },
)
