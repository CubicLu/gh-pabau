import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldUpdateOneMutation = mutationField(
  'updateOneManageCustomField',
  {
    type: nonNull('ManageCustomField'),
    args: {
      data: nonNull('ManageCustomFieldUpdateInput'),
      where: nonNull('ManageCustomFieldWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.manageCustomField.update({
        where,
        data,
        ...select,
      })
    },
  },
)
