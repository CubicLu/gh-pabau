import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryUpdateManyMutation = mutationField(
  'updateManyManageCustomFieldCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ManageCustomFieldCategoryUpdateManyMutationInput'),
      where: 'ManageCustomFieldCategoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldCategory.updateMany(args as any)
    },
  },
)
