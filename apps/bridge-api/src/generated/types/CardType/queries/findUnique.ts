import { queryField, nonNull } from 'nexus'

export const CardTypeFindUniqueQuery = queryField('findUniqueCardType', {
  type: 'CardType',
  args: {
    where: nonNull('CardTypeWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cardType.findUnique({
      where,
      ...select,
    })
  },
})
