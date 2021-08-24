import { mutationField, nonNull } from 'nexus'

export const ServiceCategoryCreateOneMutation = mutationField(
  'createOneServiceCategory',
  {
    type: nonNull('ServiceCategory'),
    args: {
      data: nonNull('ServiceCategoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceCategory.create({
        data,
        ...select,
      })
    },
  },
)
