import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldUpdateOneMutation = mutationField(
  'updateOneManageCustomField',
  {
    type: nonNull('ManageCustomField'),
    args: {
      where: nonNull('ManageCustomFieldWhereUniqueInput'),
      data: nonNull('ManageCustomFieldUpdateInput'),
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
