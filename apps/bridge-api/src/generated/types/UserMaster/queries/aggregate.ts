import { queryField, list } from 'nexus'

export const UserMasterAggregateQuery = queryField('aggregateUserMaster', {
  type: 'AggregateUserMaster',
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByInput'),
    cursor: 'UserMasterWhereUniqueInput',
    distinct: 'UserMasterScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userMaster.aggregate({ ...args, ...select }) as any
  },
})
