import { queryField, nonNull, list } from 'nexus'

export const UserAlertFindCountQuery = queryField('findManyUserAlertCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserAlertWhereInput',
    orderBy: list('UserAlertOrderByWithRelationInput'),
    cursor: 'UserAlertWhereUniqueInput',
    distinct: 'UserAlertScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.userAlert.count(args as any)
  },
})
