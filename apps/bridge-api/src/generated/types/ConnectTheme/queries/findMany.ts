import { queryField, nonNull, list } from 'nexus'

export const ConnectThemeFindManyQuery = queryField('findManyConnectTheme', {
  type: nonNull(list(nonNull('ConnectTheme'))),
  args: {
    where: 'ConnectThemeWhereInput',
    orderBy: list('ConnectThemeOrderByWithRelationInput'),
    cursor: 'ConnectThemeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ConnectThemeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.connectTheme.findMany({
      ...args,
      ...select,
    })
  },
})
