import { mutationField, nonNull } from 'nexus'

export const ThirdPartyAccessDeleteOneMutation = mutationField(
  'deleteOneThirdPartyAccess',
  {
    type: 'ThirdPartyAccess',
    args: {
      where: nonNull('ThirdPartyAccessWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.thirdPartyAccess.delete({
        where,
        ...select,
      })
    },
  },
)
