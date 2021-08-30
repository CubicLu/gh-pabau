import { mutationField, nonNull } from 'nexus'

export const AtQuestionsRelationUpsertOneMutation = mutationField(
  'upsertOneAtQuestionsRelation',
  {
    type: nonNull('AtQuestionsRelation'),
    args: {
      where: nonNull('AtQuestionsRelationWhereUniqueInput'),
      create: nonNull('AtQuestionsRelationCreateInput'),
      update: nonNull('AtQuestionsRelationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestionsRelation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
