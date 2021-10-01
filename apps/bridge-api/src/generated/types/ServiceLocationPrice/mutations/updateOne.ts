import { mutationField, nonNull } from 'nexus'

export const ServiceLocationPriceUpdateOneMutation = mutationField(
  'updateOneServiceLocationPrice',
  {
    type: nonNull('ServiceLocationPrice'),
    args: {
      where: nonNull('ServiceLocationPriceWhereUniqueInput'),
      data: nonNull('ServiceLocationPriceUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceLocationPrice.update({
        where,
        data,
        ...select,
      })
    },
  },
)
