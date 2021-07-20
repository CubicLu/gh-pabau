import { mutationField, nonNull } from 'nexus'

export const SecondAtAnswerDeleteOneMutation = mutationField(
  'deleteOneSecondAtAnswer',
  {
    type: 'SecondAtAnswer',
    args: {
      where: nonNull('SecondAtAnswerWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.secondAtAnswer.delete({
        where,
        ...select,
      })
    },
  },
)
