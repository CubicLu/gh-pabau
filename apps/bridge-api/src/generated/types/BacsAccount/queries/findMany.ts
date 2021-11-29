import { queryField, nonNull, list } from 'nexus'

export const BacsAccountFindManyQuery = queryField('findManyBacsAccount', {
  type: nonNull(list(nonNull('BacsAccount'))),
  args: {
    where: 'BacsAccountWhereInput',
    orderBy: list('BacsAccountOrderByWithRelationInput'),
    cursor: 'BacsAccountWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BacsAccountScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bacsAccount.findMany({
      ...args,
      ...select,
    })
  },
})
