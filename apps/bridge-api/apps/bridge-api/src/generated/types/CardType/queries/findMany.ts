import { queryField, nonNull, list } from 'nexus'

export const CardTypeFindManyQuery = queryField('findManyCardType', {
  type: nonNull(list(nonNull('CardType'))),
  args: {
    where: 'CardTypeWhereInput',
    orderBy: list('CardTypeOrderByWithRelationInput'),
    cursor: 'CardTypeWhereUniqueInput',
    distinct: 'CardTypeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cardType.findMany({
      ...args,
      ...select,
    })
  },
})
