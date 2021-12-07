import { mutationField, nonNull } from 'nexus'

export const ConnectThemeUpdateOneMutation = mutationField(
  'updateOneConnectTheme',
  {
    type: nonNull('ConnectTheme'),
    args: {
      data: nonNull('ConnectThemeUpdateInput'),
      where: nonNull('ConnectThemeWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.connectTheme.update({
        where,
        data,
        ...select,
      })
    },
  },
)
