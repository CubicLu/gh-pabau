import { queryField, nonNull, list } from 'nexus'

export const UserAlertTypeFindCountQuery = queryField(
  'findManyUserAlertTypeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserAlertTypeWhereInput',
      orderBy: list('UserAlertTypeOrderByWithRelationInput'),
      cursor: 'UserAlertTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserAlertTypeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertType.count(args as any)
    },
  },
)
