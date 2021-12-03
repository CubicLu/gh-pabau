import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldItemUpdateManyMutation = mutationField(
  'updateManyManageCustomFieldItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ManageCustomFieldItemUpdateManyMutationInput'),
      where: 'ManageCustomFieldItemWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldItem.updateMany(args as any)
    },
  },
)
