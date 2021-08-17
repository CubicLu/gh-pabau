import { mutationField, nonNull } from 'nexus'

export const CardTypeUpdateOneMutation = mutationField('updateOneCardType', {
  type: nonNull('CardType'),
  args: {
    where: nonNull('CardTypeWhereUniqueInput'),
    data: nonNull('CardTypeUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cardType.update({
      where,
      data,
      ...select,
    })
  },
})
