import { mutationField, nonNull } from 'nexus'

export const ServiceUserTierDeleteOneMutation = mutationField(
  'deleteOneServiceUserTier',
  {
    type: 'ServiceUserTier',
    args: {
      where: nonNull('ServiceUserTierWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceUserTier.delete({
        where,
        ...select,
      })
    },
  },
)
