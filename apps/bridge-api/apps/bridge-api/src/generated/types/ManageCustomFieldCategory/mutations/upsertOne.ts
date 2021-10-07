import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryUpsertOneMutation = mutationField(
  'upsertOneManageCustomFieldCategory',
  {
    type: nonNull('ManageCustomFieldCategory'),
    args: {
      where: nonNull('ManageCustomFieldCategoryWhereUniqueInput'),
      create: nonNull('ManageCustomFieldCategoryCreateInput'),
      update: nonNull('ManageCustomFieldCategoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldCategory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
