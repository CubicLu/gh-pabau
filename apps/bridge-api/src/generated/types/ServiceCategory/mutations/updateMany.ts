import { mutationField, nonNull } from 'nexus'

export const ServiceCategoryUpdateManyMutation = mutationField(
  'updateManyServiceCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ServiceCategoryWhereInput',
      data: nonNull('ServiceCategoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceCategory.updateMany(args as any)
    },
  },
)
