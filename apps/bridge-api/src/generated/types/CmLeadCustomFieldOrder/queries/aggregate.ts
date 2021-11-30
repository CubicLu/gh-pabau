import { queryField, list } from 'nexus'

export const CmLeadCustomFieldOrderAggregateQuery = queryField(
  'aggregateCmLeadCustomFieldOrder',
  {
    type: 'AggregateCmLeadCustomFieldOrder',
    args: {
      where: 'CmLeadCustomFieldOrderWhereInput',
      orderBy: list('CmLeadCustomFieldOrderOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomFieldOrder.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
