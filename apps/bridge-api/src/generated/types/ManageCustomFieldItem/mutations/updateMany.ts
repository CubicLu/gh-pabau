import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldItemUpdateManyMutation = mutationField(
  'updateManyManageCustomFieldItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ManageCustomFieldItemWhereInput',
      data: nonNull('ManageCustomFieldItemUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldItem.updateMany(args as any)
    },
  },
)
