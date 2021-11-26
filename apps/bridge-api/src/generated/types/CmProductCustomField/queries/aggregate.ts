import { queryField, list } from 'nexus'

export const CmProductCustomFieldAggregateQuery = queryField(
  'aggregateCmProductCustomField',
  {
    type: 'AggregateCmProductCustomField',
    args: {
      where: 'CmProductCustomFieldWhereInput',
      orderBy: list('CmProductCustomFieldOrderByWithRelationInput'),
      cursor: 'CmProductCustomFieldWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmProductCustomField.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
