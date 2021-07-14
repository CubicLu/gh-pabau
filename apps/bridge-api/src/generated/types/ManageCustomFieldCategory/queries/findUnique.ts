import { queryField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryFindUniqueQuery = queryField(
  'findUniqueManageCustomFieldCategory',
  {
    type: 'ManageCustomFieldCategory',
    args: {
      where: nonNull('ManageCustomFieldCategoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.manageCustomFieldCategory.findUnique({
        where,
        ...select,
      })
    },
  },
)
