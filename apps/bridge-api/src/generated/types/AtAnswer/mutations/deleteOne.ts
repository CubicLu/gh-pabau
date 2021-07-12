import { mutationField, nonNull } from 'nexus'

export const AtAnswerDeleteOneMutation = mutationField('deleteOneAtAnswer', {
  type: 'AtAnswer',
  args: {
    where: nonNull('AtAnswerWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.atAnswer.delete({
      where,
      ...select,
    })
  },
})
