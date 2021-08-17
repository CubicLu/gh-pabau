import { queryField, nonNull } from 'nexus'

export const ManageCustomFieldItemFindUniqueQuery = queryField(
  'findUniqueManageCustomFieldItem',
  {
    type: 'ManageCustomFieldItem',
    args: {
      where: nonNull('ManageCustomFieldItemWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.manageCustomFieldItem.findUnique({
        where,
        ...select,
      })
    },
  },
)
