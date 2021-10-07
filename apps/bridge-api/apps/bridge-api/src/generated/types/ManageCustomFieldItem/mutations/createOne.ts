import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldItemCreateOneMutation = mutationField(
  'createOneManageCustomFieldItem',
  {
    type: nonNull('ManageCustomFieldItem'),
    args: {
      data: nonNull('ManageCustomFieldItemCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.manageCustomFieldItem.create({
        data,
        ...select,
      })
    },
  },
)
