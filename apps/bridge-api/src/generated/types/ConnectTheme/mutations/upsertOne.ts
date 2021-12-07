import { mutationField, nonNull } from 'nexus'

export const ConnectThemeUpsertOneMutation = mutationField(
  'upsertOneConnectTheme',
  {
    type: nonNull('ConnectTheme'),
    args: {
      where: nonNull('ConnectThemeWhereUniqueInput'),
      create: nonNull('ConnectThemeCreateInput'),
      update: nonNull('ConnectThemeUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.connectTheme.upsert({
        ...args,
        ...select,
      })
    },
  },
)
