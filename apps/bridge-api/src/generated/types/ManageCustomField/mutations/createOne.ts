import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCreateOneMutation = mutationField(
  'createOneManageCustomField',
  {
    type: nonNull('ManageCustomField'),
    args: {
      data: nonNull('ManageCustomFieldCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.manageCustomField.create({
        data,
        ...select,
      })
    },
  },
)
