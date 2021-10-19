import { mutationField, nonNull } from 'nexus'

export const PathwayStepsTakenUpsertOneMutation = mutationField(
  'upsertOnePathwayStepsTaken',
  {
    type: nonNull('PathwayStepsTaken'),
    args: {
      where: nonNull('PathwayStepsTakenWhereUniqueInput'),
      create: nonNull('PathwayStepsTakenCreateInput'),
      update: nonNull('PathwayStepsTakenUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStepsTaken.upsert({
        ...args,
        ...select,
      })
    },
  },
)
