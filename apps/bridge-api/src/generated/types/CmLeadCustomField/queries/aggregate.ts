import { queryField, list } from 'nexus'

export const CmLeadCustomFieldAggregateQuery = queryField(
  'aggregateCmLeadCustomField',
  {
    type: 'AggregateCmLeadCustomField',
    args: {
      where: 'CmLeadCustomFieldWhereInput',
      orderBy: list('CmLeadCustomFieldOrderByWithRelationInput'),
      cursor: 'CmLeadCustomFieldWhereUniqueInput',
      distinct: 'CmLeadCustomFieldScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmLeadCustomField.aggregate({ ...args, ...select }) as any
    },
  },
)
