import { queryField, nonNull } from 'nexus'

export const UserAlertFindUniqueQuery = queryField('findUniqueUserAlert', {
  type: 'UserAlert',
  args: {
    where: nonNull('UserAlertWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.userAlert.findUnique({
      where,
      ...select,
    })
  },
})
