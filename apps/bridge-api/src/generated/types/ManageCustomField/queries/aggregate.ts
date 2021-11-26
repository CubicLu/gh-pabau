import { queryField, list } from 'nexus'

export const ManageCustomFieldAggregateQuery = queryField(
  'aggregateManageCustomField',
  {
    type: 'AggregateManageCustomField',
    args: {
      where: 'ManageCustomFieldWhereInput',
      orderBy: list('ManageCustomFieldOrderByWithRelationInput'),
      cursor: 'ManageCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomField.aggregate({ ...args, ...select }) as any
    },
  },
)
