import { mutationField, nonNull } from 'nexus'

export const ServiceCategoryUpsertOneMutation = mutationField(
  'upsertOneServiceCategory',
  {
    type: nonNull('ServiceCategory'),
    args: {
      where: nonNull('ServiceCategoryWhereUniqueInput'),
      create: nonNull('ServiceCategoryCreateInput'),
      update: nonNull('ServiceCategoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceCategory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
