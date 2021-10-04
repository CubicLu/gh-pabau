import { mutationField, nonNull } from 'nexus'

export const ServiceLocationPriceCreateOneMutation = mutationField(
  'createOneServiceLocationPrice',
  {
    type: nonNull('ServiceLocationPrice'),
    args: {
      data: nonNull('ServiceLocationPriceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceLocationPrice.create({
        data,
        ...select,
      })
    },
  },
)
