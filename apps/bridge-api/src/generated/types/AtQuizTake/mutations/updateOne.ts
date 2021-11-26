import { mutationField, nonNull } from 'nexus'

export const AtQuizTakeUpdateOneMutation = mutationField(
  'updateOneAtQuizTake',
  {
    type: nonNull('AtQuizTake'),
    args: {
      data: nonNull('AtQuizTakeUpdateInput'),
      where: nonNull('AtQuizTakeWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.atQuizTake.update({
        where,
        data,
        ...select,
      })
    },
  },
)
