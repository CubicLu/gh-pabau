import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldItemUpsertOneMutation = mutationField(
  'upsertOneManageCustomFieldItem',
  {
    type: nonNull('ManageCustomFieldItem'),
    args: {
      where: nonNull('ManageCustomFieldItemWhereUniqueInput'),
      create: nonNull('ManageCustomFieldItemCreateInput'),
      update: nonNull('ManageCustomFieldItemUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldItem.upsert({
        ...args,
        ...select,
      })
    },
  },
)
