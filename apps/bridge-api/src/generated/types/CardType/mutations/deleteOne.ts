import { mutationField, nonNull } from 'nexus'

export const CardTypeDeleteOneMutation = mutationField('deleteOneCardType', {
  type: 'CardType',
  args: {
    where: nonNull('CardTypeWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.cardType.delete({
      where,
      ...select,
    })
  },
})
