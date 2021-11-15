import { queryField, list } from 'nexus'

export const CustomFieldDisplayAggregateQuery = queryField(
  'aggregateCustomFieldDisplay',
  {
    type: 'AggregateCustomFieldDisplay',
    args: {
      where: 'CustomFieldDisplayWhereInput',
      orderBy: list('CustomFieldDisplayOrderByWithRelationInput'),
      cursor: 'CustomFieldDisplayWhereUniqueInput',
      distinct: 'CustomFieldDisplayScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.customFieldDisplay.aggregate({ ...args, ...select }) as any
    },
  },
)
