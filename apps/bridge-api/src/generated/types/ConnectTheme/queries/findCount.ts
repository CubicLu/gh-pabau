import { queryField, nonNull, list } from 'nexus'

export const ConnectThemeFindCountQuery = queryField(
  'findManyConnectThemeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ConnectThemeWhereInput',
      orderBy: list('ConnectThemeOrderByWithRelationInput'),
      cursor: 'ConnectThemeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ConnectThemeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.connectTheme.count(args as any)
    },
  },
)
