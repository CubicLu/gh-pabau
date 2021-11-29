import { queryField, nonNull, list } from 'nexus'

export const UserAlertFindManyQuery = queryField('findManyUserAlert', {
  type: nonNull(list(nonNull('UserAlert'))),
  args: {
    where: 'UserAlertWhereInput',
    orderBy: list('UserAlertOrderByWithRelationInput'),
    cursor: 'UserAlertWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserAlertScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlert.findMany({
      ...args,
      ...select,
    })
  },
})
