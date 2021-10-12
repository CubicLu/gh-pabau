import { mutationField, nonNull } from 'nexus'

export const ServiceUserPriceUpsertOneMutation = mutationField(
  'upsertOneServiceUserPrice',
  {
    type: nonNull('ServiceUserPrice'),
    args: {
      where: nonNull('ServiceUserPriceWhereUniqueInput'),
      create: nonNull('ServiceUserPriceCreateInput'),
      update: nonNull('ServiceUserPriceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserPrice.upsert({
        ...args,
        ...select,
      })
    },
  },
)
