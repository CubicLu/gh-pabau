import { queryField, list } from 'nexus'

export const ManageCustomFieldCategoryAggregateQuery = queryField(
  'aggregateManageCustomFieldCategory',
  {
    type: 'AggregateManageCustomFieldCategory',
    args: {
      where: 'ManageCustomFieldCategoryWhereInput',
      orderBy: list('ManageCustomFieldCategoryOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldCategory.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
