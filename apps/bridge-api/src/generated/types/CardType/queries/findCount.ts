import { queryField, nonNull, list } from 'nexus'

export const CardTypeFindCountQuery = queryField('findManyCardTypeCount', {
  type: nonNull('Int'),
  args: {
    where: 'CardTypeWhereInput',
    orderBy: list('CardTypeOrderByWithRelationInput'),
    cursor: 'CardTypeWhereUniqueInput',
    distinct: 'CardTypeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cardType.count(args as any)
  },
})
