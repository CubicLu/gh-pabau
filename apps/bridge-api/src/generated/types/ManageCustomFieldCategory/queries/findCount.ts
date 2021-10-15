import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldCategoryFindCountQuery = queryField(
  'findManyManageCustomFieldCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      orderBy: list('ManageCustomFieldCategoryOrderByInput'),
      cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
      distinct: 'ManageCustomFieldCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.manageCustomFieldCategory.count(args as any)
    },
  },
)
