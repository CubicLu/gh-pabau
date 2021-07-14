import { mutationField, nonNull } from 'nexus'

export const SecondAtAnswerUpsertOneMutation = mutationField(
  'upsertOneSecondAtAnswer',
  {
    type: nonNull('SecondAtAnswer'),
    args: {
      where: nonNull('SecondAtAnswerWhereUniqueInput'),
      create: nonNull('SecondAtAnswerCreateInput'),
      update: nonNull('SecondAtAnswerUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtAnswer.upsert({
        ...args,
        ...select,
      })
    },
  },
)
