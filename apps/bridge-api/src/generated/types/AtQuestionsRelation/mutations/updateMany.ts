import { mutationField, nonNull } from 'nexus'

export const AtQuestionsRelationUpdateManyMutation = mutationField(
  'updateManyAtQuestionsRelation',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AtQuestionsRelationWhereInput',
      data: nonNull('AtQuestionsRelationUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuestionsRelation.updateMany(args as any)
    },
  },
)
