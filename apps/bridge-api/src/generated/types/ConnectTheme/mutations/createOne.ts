import { mutationField, nonNull } from 'nexus'

export const ConnectThemeCreateOneMutation = mutationField(
  'createOneConnectTheme',
  {
    type: nonNull('ConnectTheme'),
    args: {
      data: nonNull('ConnectThemeCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.connectTheme.create({
        data,
        ...select,
      })
    },
  },
)
