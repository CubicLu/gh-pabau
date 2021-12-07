import { mutationField, nonNull } from 'nexus'

export const ConnectThemeUpdateManyMutation = mutationField(
  'updateManyConnectTheme',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ConnectThemeUpdateManyMutationInput'),
      where: 'ConnectThemeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.connectTheme.updateMany(args as any)
    },
  },
)
