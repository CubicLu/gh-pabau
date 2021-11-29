import { queryField, list } from 'nexus'

export const BacsAccountFindFirstQuery = queryField('findFirstBacsAccount', {
  type: 'BacsAccount',
  args: {
    where: 'BacsAccountWhereInput',
    orderBy: list('BacsAccountOrderByWithRelationInput'),
    cursor: 'BacsAccountWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BacsAccountScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bacsAccount.findFirst({
      ...args,
      ...select,
    })
  },
})
