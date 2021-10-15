import { queryField, nonNull, list } from 'nexus'

export const UserAlertTypeFindManyQuery = queryField('findManyUserAlertType', {
  type: nonNull(list(nonNull('UserAlertType'))),
  args: {
    where: 'UserAlertTypeWhereInput',
    orderBy: list('UserAlertTypeOrderByInput'),
    cursor: 'UserAlertTypeWhereUniqueInput',
    distinct: 'UserAlertTypeScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlertType.findMany({
      ...args,
      ...select,
    })
  },
})
