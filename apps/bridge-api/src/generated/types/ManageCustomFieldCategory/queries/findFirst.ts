import { queryField, list } from 'nexus'

export const ManageCustomFieldCategoryFindFirstQuery = queryField(
  'findFirstManageCustomFieldCategory',
  {
    type: 'ManageCustomFieldCategory',
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      orderBy: list('ManageCustomFieldCategoryOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ManageCustomFieldCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
