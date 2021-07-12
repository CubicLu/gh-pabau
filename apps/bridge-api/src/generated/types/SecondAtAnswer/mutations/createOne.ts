import { mutationField, nonNull } from 'nexus'

export const SecondAtAnswerCreateOneMutation = mutationField(
  'createOneSecondAtAnswer',
  {
    type: nonNull('SecondAtAnswer'),
    args: {
      data: nonNull('SecondAtAnswerCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.secondAtAnswer.create({
        data,
        ...select,
      })
    },
  },
)
