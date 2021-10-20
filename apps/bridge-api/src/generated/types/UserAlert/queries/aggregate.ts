import { queryField, list } from 'nexus'

export const UserAlertAggregateQuery = queryField('aggregateUserAlert', {
  type: 'AggregateUserAlert',
  args: {
    where: 'UserAlertWhereInput',
    orderBy: list('UserAlertOrderByWithRelationInput'),
    cursor: 'UserAlertWhereUniqueInput',
    distinct: 'UserAlertScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlert.aggregate({ ...args, ...select }) as any
  },
})
