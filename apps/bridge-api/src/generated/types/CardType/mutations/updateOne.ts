import { mutationField, nonNull } from 'nexus'

export const CardTypeUpdateOneMutation = mutationField('updateOneCardType', {
  type: nonNull('CardType'),
  args: {
    data: nonNull('CardTypeUpdateInput'),
    where: nonNull('CardTypeWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cardType.update({
      where,
      data,
      ...select,
    })
  },
})
