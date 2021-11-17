import { mutationField, nonNull } from 'nexus'

export const ServiceLocationTierCreateOneMutation = mutationField(
  'createOneServiceLocationTier',
  {
    type: nonNull('ServiceLocationTier'),
    args: {
      data: nonNull('ServiceLocationTierCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceLocationTier.create({
        data,
        ...select,
      })
    },
  },
)
