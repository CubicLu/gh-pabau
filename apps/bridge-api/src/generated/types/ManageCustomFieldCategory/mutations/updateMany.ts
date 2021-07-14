import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryUpdateManyMutation = mutationField(
  'updateManyManageCustomFieldCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      data: nonNull('ManageCustomFieldCategoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldCategory.updateMany(args as any)
    },
  },
)
