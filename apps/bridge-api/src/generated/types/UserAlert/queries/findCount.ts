import { queryField, nonNull, list } from 'nexus'

export const UserAlertFindCountQuery = queryField('findManyUserAlertCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserAlertWhereInput',
    orderBy: list('UserAlertOrderByWithRelationInput'),
    cursor: 'UserAlertWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserAlertScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.userAlert.count(args as any)
  },
})
