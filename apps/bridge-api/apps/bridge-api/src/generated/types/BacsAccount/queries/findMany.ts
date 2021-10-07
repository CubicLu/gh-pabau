import { queryField, nonNull, list } from 'nexus'

export const BacsAccountFindManyQuery = queryField('findManyBacsAccount', {
  type: nonNull(list(nonNull('BacsAccount'))),
  args: {
    where: 'BacsAccountWhereInput',
    orderBy: list('BacsAccountOrderByWithRelationInput'),
    cursor: 'BacsAccountWhereUniqueInput',
    distinct: 'BacsAccountScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bacsAccount.findMany({
      ...args,
      ...select,
    })
  },
})
