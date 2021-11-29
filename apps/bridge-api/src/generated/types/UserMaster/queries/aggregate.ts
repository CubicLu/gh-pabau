import { queryField, list } from 'nexus'

export const UserMasterAggregateQuery = queryField('aggregateUserMaster', {
  type: 'AggregateUserMaster',
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByWithRelationInput'),
    cursor: 'UserMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userMaster.aggregate({ ...args, ...select }) as any
  },
})
