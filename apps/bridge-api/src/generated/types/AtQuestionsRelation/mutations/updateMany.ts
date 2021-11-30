import { mutationField, nonNull } from 'nexus'

export const AtQuestionsRelationUpdateManyMutation = mutationField(
  'updateManyAtQuestionsRelation',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AtQuestionsRelationUpdateManyMutationInput'),
      where: 'AtQuestionsRelationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuestionsRelation.updateMany(args as any)
    },
  },
)
