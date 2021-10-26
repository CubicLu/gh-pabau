import { mutationField, nonNull } from 'nexus'

export const ServiceUserTierUpdateOneMutation = mutationField(
  'updateOneServiceUserTier',
  {
    type: nonNull('ServiceUserTier'),
    args: {
      where: nonNull('ServiceUserTierWhereUniqueInput'),
      data: nonNull('ServiceUserTierUpdateInput'),
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
