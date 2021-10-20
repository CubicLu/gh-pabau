import { queryField, list } from 'nexus'

export const CmProductCustomFieldAggregateQuery = queryField(
  'aggregateCmProductCustomField',
  {
    type: 'AggregateCmProductCustomField',
    args: {
      where: 'CmProductCustomFieldWhereInput',
      orderBy: list('CmProductCustomFieldOrderByWithRelationInput'),
      cursor: 'CmProductCustomFieldWhereUniqueInput',
      distinct: 'CmProductCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmProductCustomField.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
