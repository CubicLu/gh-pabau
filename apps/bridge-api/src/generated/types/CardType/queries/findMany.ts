import { queryField, nonNull, list } from 'nexus'

export const CardTypeFindManyQuery = queryField('findManyCardType', {
  type: nonNull(list(nonNull('CardType'))),
  args: {
    where: 'CardTypeWhereInput',
    orderBy: list('CardTypeOrderByWithRelationInput'),
    cursor: 'CardTypeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CardTypeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cardType.findMany({
      ...args,
      ...select,
    })
  },
})
