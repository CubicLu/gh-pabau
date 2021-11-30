import { mutationField, nonNull } from 'nexus'

export const SupplierCategoryUpdateManyMutation = mutationField(
  'updateManySupplierCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SupplierCategoryUpdateManyMutationInput'),
      where: 'SupplierCategoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.supplierCategory.updateMany(args as any)
    },
  },
)
