import { queryField, nonNull, list } from 'nexus'

export const UserAlertTypeFindCountQuery = queryField(
  'findManyUserAlertTypeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserAlertTypeWhereInput',
      orderBy: list('UserAlertTypeOrderByInput'),
      cursor: 'UserAlertTypeWhereUniqueInput',
      distinct: 'UserAlertTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertType.count(args as any)
    },
  },
)
