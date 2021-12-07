import { queryField, list } from 'nexus'

export const ConnectThemeFindFirstQuery = queryField('findFirstConnectTheme', {
  type: 'ConnectTheme',
  args: {
    where: 'ConnectThemeWhereInput',
    orderBy: list('ConnectThemeOrderByWithRelationInput'),
    cursor: 'ConnectThemeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ConnectThemeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.connectTheme.findFirst({
      ...args,
      ...select,
    })
  },
})
