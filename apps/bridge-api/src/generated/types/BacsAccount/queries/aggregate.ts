import { queryField, list } from 'nexus'

export const BacsAccountAggregateQuery = queryField('aggregateBacsAccount', {
  type: 'AggregateBacsAccount',
  args: {
    where: 'BacsAccountWhereInput',
    orderBy: list('BacsAccountOrderByInput'),
    cursor: 'BacsAccountWhereUniqueInput',
    distinct: 'BacsAccountScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bacsAccount.aggregate({ ...args, ...select }) as any
  },
})
