import { queryField, nonNull, list } from 'nexus'

export const UserAlertTypeFindManyQuery = queryField('findManyUserAlertType', {
  type: nonNull(list(nonNull('UserAlertType'))),
  args: {
    where: 'UserAlertTypeWhereInput',
    orderBy: list('UserAlertTypeOrderByWithRelationInput'),
    cursor: 'UserAlertTypeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserAlertTypeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlertType.findMany({
      ...args,
      ...select,
    })
  },
})
