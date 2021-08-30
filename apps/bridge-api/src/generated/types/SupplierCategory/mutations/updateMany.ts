import { mutationField, nonNull } from 'nexus'

export const SupplierCategoryUpdateManyMutation = mutationField(
  'updateManySupplierCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SupplierCategoryWhereInput',
      data: nonNull('SupplierCategoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.supplierCategory.updateMany(args as any)
    },
  },
)
