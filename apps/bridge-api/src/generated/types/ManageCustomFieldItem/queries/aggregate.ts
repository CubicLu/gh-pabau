import { queryField, list } from 'nexus'

export const ManageCustomFieldItemAggregateQuery = queryField(
  'aggregateManageCustomFieldItem',
  {
    type: 'AggregateManageCustomFieldItem',
    args: {
      where: 'ManageCustomFieldItemWhereInput',
      orderBy: list('ManageCustomFieldItemOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldItemWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomFieldItem.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
