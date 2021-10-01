import { mutationField, nonNull } from 'nexus'

export const ServiceUserPriceUpdateOneMutation = mutationField(
  'updateOneServiceUserPrice',
  {
    type: nonNull('ServiceUserPrice'),
    args: {
      where: nonNull('ServiceUserPriceWhereUniqueInput'),
      data: nonNull('ServiceUserPriceUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceUserPrice.update({
        where,
        data,
        ...select,
      })
    },
  },
)
