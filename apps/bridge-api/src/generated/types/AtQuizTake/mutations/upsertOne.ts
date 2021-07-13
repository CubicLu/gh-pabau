import { mutationField, nonNull } from 'nexus'

export const AtQuizTakeUpsertOneMutation = mutationField(
  'upsertOneAtQuizTake',
  {
    type: nonNull('AtQuizTake'),
    args: {
      where: nonNull('AtQuizTakeWhereUniqueInput'),
      create: nonNull('AtQuizTakeCreateInput'),
      update: nonNull('AtQuizTakeUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuizTake.upsert({
        ...args,
        ...select,
      })
    },
  },
)
