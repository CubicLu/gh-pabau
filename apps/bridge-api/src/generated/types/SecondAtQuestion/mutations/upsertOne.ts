import { mutationField, nonNull } from 'nexus'

export const SecondAtQuestionUpsertOneMutation = mutationField(
  'upsertOneSecondAtQuestion',
  {
    type: nonNull('SecondAtQuestion'),
    args: {
      where: nonNull('SecondAtQuestionWhereUniqueInput'),
      create: nonNull('SecondAtQuestionCreateInput'),
      update: nonNull('SecondAtQuestionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtQuestion.upsert({
        ...args,
        ...select,
      })
    },
  },
)
