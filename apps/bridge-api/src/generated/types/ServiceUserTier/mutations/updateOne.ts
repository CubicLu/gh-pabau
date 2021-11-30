import { mutationField, nonNull } from 'nexus'

export const ServiceUserTierUpdateOneMutation = mutationField(
  'updateOneServiceUserTier',
  {
    type: nonNull('ServiceUserTier'),
    args: {
      data: nonNull('ServiceUserTierUpdateInput'),
      where: nonNull('ServiceUserTierWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceUserTier.update({
        where,
        data,
        ...select,
      })
    },
  },
)
