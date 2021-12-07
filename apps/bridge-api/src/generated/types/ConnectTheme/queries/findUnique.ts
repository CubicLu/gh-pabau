import { queryField, nonNull } from 'nexus'

export const ConnectThemeFindUniqueQuery = queryField(
  'findUniqueConnectTheme',
  {
    type: 'ConnectTheme',
    args: {
      where: nonNull('ConnectThemeWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.connectTheme.findUnique({
        where,
        ...select,
      })
    },
  },
)
