import { mutationField, nonNull } from 'nexus'

export const ServiceUserTierCreateOneMutation = mutationField(
  'createOneServiceUserTier',
  {
    type: nonNull('ServiceUserTier'),
    args: {
      data: nonNull('ServiceUserTierCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceUserTier.create({
        data,
        ...select,
      })
    },
  },
)
