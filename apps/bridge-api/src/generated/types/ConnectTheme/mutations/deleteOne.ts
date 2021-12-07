import { mutationField, nonNull } from 'nexus'

export const ConnectThemeDeleteOneMutation = mutationField(
  'deleteOneConnectTheme',
  {
    type: 'ConnectTheme',
    args: {
      where: nonNull('ConnectThemeWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.connectTheme.delete({
        where,
        ...select,
      })
    },
  },
)
