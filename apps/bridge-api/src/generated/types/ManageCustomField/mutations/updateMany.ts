import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldUpdateManyMutation = mutationField(
  'updateManyManageCustomField',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ManageCustomFieldUpdateManyMutationInput'),
      where: 'ManageCustomFieldWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomField.updateMany(args as any)
    },
  },
)
