import { queryField, list } from 'nexus'

export const ManageCustomFieldCategoryFindFirstQuery = queryField(
  'findFirstManageCustomFieldCategory',
  {
    type: 'ManageCustomFieldCategory',
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      orderBy: list('ManageCustomFieldCategoryOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
      distinct: 'ManageCustomFieldCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
