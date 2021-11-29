import { queryField, list } from 'nexus'

export const BacsAccountAggregateQuery = queryField('aggregateBacsAccount', {
  type: 'AggregateBacsAccount',
  args: {
    where: 'BacsAccountWhereInput',
    orderBy: list('BacsAccountOrderByWithRelationInput'),
    cursor: 'BacsAccountWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bacsAccount.aggregate({ ...args, ...select }) as any
  },
})
