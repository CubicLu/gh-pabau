import { mutationField, nonNull } from 'nexus'

export const ServiceLocationPriceUpsertOneMutation = mutationField(
  'upsertOneServiceLocationPrice',
  {
    type: nonNull('ServiceLocationPrice'),
    args: {
      where: nonNull('ServiceLocationPriceWhereUniqueInput'),
      create: nonNull('ServiceLocationPriceCreateInput'),
      update: nonNull('ServiceLocationPriceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationPrice.upsert({
        ...args,
        ...select,
      })
    },
  },
)
