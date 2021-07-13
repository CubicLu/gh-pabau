import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldUpdateManyMutation = mutationField(
  'updateManyManageCustomField',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ManageCustomFieldWhereInput',
      data: nonNull('ManageCustomFieldUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomField.updateMany(args as any)
    },
  },
)
