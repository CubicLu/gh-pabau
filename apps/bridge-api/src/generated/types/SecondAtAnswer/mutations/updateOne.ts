import { mutationField, nonNull } from 'nexus'

export const SecondAtAnswerUpdateOneMutation = mutationField(
  'updateOneSecondAtAnswer',
  {
    type: nonNull('SecondAtAnswer'),
    args: {
      data: nonNull('SecondAtAnswerUpdateInput'),
      where: nonNull('SecondAtAnswerWhereUniqueInput'),
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
