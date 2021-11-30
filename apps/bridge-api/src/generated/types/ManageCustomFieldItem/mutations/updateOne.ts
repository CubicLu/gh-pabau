import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldItemUpdateOneMutation = mutationField(
  'updateOneManageCustomFieldItem',
  {
    type: nonNull('ManageCustomFieldItem'),
    args: {
      data: nonNull('ManageCustomFieldItemUpdateInput'),
      where: nonNull('ManageCustomFieldItemWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.manageCustomFieldItem.update({
        where,
        data,
        ...select,
      })
    },
  },
)
