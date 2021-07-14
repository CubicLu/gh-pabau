import { mutationField, nonNull } from 'nexus'

export const AtQuizTakeUpdateOneMutation = mutationField(
  'updateOneAtQuizTake',
  {
    type: nonNull('AtQuizTake'),
    args: {
      where: nonNull('AtQuizTakeWhereUniqueInput'),
      data: nonNull('AtQuizTakeUpdateInput'),
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
