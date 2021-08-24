import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldItemUpdateOneMutation = mutationField(
  'updateOneManageCustomFieldItem',
  {
    type: nonNull('ManageCustomFieldItem'),
    args: {
      where: nonNull('ManageCustomFieldItemWhereUniqueInput'),
      data: nonNull('ManageCustomFieldItemUpdateInput'),
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
