import { mutationField, nonNull } from 'nexus'

export const ServiceUserPriceCreateOneMutation = mutationField(
  'createOneServiceUserPrice',
  {
    type: nonNull('ServiceUserPrice'),
    args: {
      data: nonNull('ServiceUserPriceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceUserPrice.create({
        data,
        ...select,
      })
    },
  },
)
