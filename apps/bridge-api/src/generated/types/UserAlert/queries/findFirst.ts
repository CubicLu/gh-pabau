import { queryField, list } from 'nexus'

export const UserAlertFindFirstQuery = queryField('findFirstUserAlert', {
  type: 'UserAlert',
  args: {
    where: 'UserAlertWhereInput',
    orderBy: list('UserAlertOrderByWithRelationInput'),
    cursor: 'UserAlertWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserAlertScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlert.findFirst({
      ...args,
      ...select,
    })
  },
})
