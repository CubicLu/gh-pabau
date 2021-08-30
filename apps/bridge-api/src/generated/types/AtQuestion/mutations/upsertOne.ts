import { mutationField, nonNull } from 'nexus'

export const AtQuestionUpsertOneMutation = mutationField(
  'upsertOneAtQuestion',
  {
    type: nonNull('AtQuestion'),
    args: {
      where: nonNull('AtQuestionWhereUniqueInput'),
      create: nonNull('AtQuestionCreateInput'),
      update: nonNull('AtQuestionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestion.upsert({
        ...args,
        ...select,
      })
    },
  },
)
