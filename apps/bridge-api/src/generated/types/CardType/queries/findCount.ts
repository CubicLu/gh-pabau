import { queryField, nonNull, list } from 'nexus'

export const CardTypeFindCountQuery = queryField('findManyCardTypeCount', {
  type: nonNull('Int'),
  args: {
    where: 'CardTypeWhereInput',
    orderBy: list('CardTypeOrderByWithRelationInput'),
    cursor: 'CardTypeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CardTypeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cardType.count(args as any)
  },
})
