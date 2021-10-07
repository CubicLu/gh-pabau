import { queryField, nonNull } from 'nexus'

export const ManageCustomFieldFindUniqueQuery = queryField(
  'findUniqueManageCustomField',
  {
    type: 'ManageCustomField',
    args: {
      where: nonNull('ManageCustomFieldWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.manageCustomField.findUnique({
        where,
        ...select,
      })
    },
  },
)
