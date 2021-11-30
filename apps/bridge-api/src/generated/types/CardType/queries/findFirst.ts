import { queryField, list } from 'nexus'

export const CardTypeFindFirstQuery = queryField('findFirstCardType', {
  type: 'CardType',
  args: {
    where: 'CardTypeWhereInput',
    orderBy: list('CardTypeOrderByWithRelationInput'),
    cursor: 'CardTypeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CardTypeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cardType.findFirst({
      ...args,
      ...select,
    })
  },
})
