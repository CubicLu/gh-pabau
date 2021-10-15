import { queryField, list } from 'nexus'

export const ManageCustomFieldCategoryAggregateQuery = queryField(
  'aggregateManageCustomFieldCategory',
  {
    type: 'AggregateManageCustomFieldCategory',
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      orderBy: list('ManageCustomFieldCategoryOrderByInput'),
      cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
      distinct: 'ManageCustomFieldCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldCategory.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
