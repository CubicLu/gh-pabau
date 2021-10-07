import { queryField, nonNull, list } from 'nexus'

export const ManageCustomFieldCategoryFindManyQuery = queryField(
  'findManyManageCustomFieldCategory',
  {
    type: nonNull(list(nonNull('ManageCustomFieldCategory'))),
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      orderBy: list('ManageCustomFieldCategoryOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
      distinct: 'ManageCustomFieldCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldCategory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
