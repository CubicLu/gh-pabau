import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldCategoryFindCountQuery = queryField(
  'findManyManageCustomFieldCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      orderBy: list('ManageCustomFieldCategoryOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ManageCustomFieldCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldCategory.count(args as any)
    },
  },
)
