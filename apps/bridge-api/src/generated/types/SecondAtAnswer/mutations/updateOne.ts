import { mutationField, nonNull } from 'nexus'

export const SecondAtAnswerUpdateOneMutation = mutationField(
  'updateOneSecondAtAnswer',
  {
    type: nonNull('SecondAtAnswer'),
    args: {
      where: nonNull('SecondAtAnswerWhereUniqueInput'),
      data: nonNull('SecondAtAnswerUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.secondAtAnswer.update({
        where,
        data,
        ...select,
      })
    },
  },
)
