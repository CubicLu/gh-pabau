import { mutationField, nonNull } from 'nexus'

export const AtQuizTakeCreateOneMutation = mutationField(
  'createOneAtQuizTake',
  {
    type: nonNull('AtQuizTake'),
    args: {
      data: nonNull('AtQuizTakeCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.atQuizTake.create({
        data,
        ...select,
      })
    },
  },
)
