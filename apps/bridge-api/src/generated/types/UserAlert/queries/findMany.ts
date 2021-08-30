import { queryField, nonNull, list } from 'nexus'

export const UserAlertFindManyQuery = queryField('findManyUserAlert', {
  type: nonNull(list(nonNull('UserAlert'))),
  args: {
    where: 'UserAlertWhereInput',
    orderBy: list('UserAlertOrderByInput'),
    cursor: 'UserAlertWhereUniqueInput',
    distinct: 'UserAlertScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlert.findMany({
      ...args,
      ...select,
    })
  },
})
