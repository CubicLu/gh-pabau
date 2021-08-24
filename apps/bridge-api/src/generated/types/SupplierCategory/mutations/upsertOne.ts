import { mutationField, nonNull } from 'nexus'

export const SupplierCategoryUpsertOneMutation = mutationField(
  'upsertOneSupplierCategory',
  {
    type: nonNull('SupplierCategory'),
    args: {
      where: nonNull('SupplierCategoryWhereUniqueInput'),
      create: nonNull('SupplierCategoryCreateInput'),
      update: nonNull('SupplierCategoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.supplierCategory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
