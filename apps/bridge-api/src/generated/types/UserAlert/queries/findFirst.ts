import { queryField, list } from 'nexus'

export const UserAlertFindFirstQuery = queryField('findFirstUserAlert', {
  type: 'UserAlert',
  args: {
    where: 'UserAlertWhereInput',
    orderBy: list('UserAlertOrderByInput'),
    cursor: 'UserAlertWhereUniqueInput',
    distinct: 'UserAlertScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlert.findFirst({
      ...args,
      ...select,
    })
  },
})
