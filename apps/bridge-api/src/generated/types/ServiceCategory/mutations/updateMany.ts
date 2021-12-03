import { mutationField, nonNull } from 'nexus'

export const ServiceCategoryUpdateManyMutation = mutationField(
  'updateManyServiceCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ServiceCategoryUpdateManyMutationInput'),
      where: 'ServiceCategoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceCategory.updateMany(args as any)
    },
  },
)
