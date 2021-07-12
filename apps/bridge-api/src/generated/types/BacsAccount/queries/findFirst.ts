import { queryField, list } from 'nexus'

export const BacsAccountFindFirstQuery = queryField('findFirstBacsAccount', {
  type: 'BacsAccount',
  args: {
    where: 'BacsAccountWhereInput',
    orderBy: list('BacsAccountOrderByInput'),
    cursor: 'BacsAccountWhereUniqueInput',
    distinct: 'BacsAccountScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bacsAccount.findFirst({
      ...args,
      ...select,
    })
  },
})
