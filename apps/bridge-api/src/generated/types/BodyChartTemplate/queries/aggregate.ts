import { queryField, list } from 'nexus'

export const BodyChartTemplateAggregateQuery = queryField(
  'aggregateBodyChartTemplate',
  {
    type: 'AggregateBodyChartTemplate',
    args: {
      where: 'BodyChartTemplateWhereInput',
      orderBy: list('BodyChartTemplateOrderByWithRelationInput'),
      cursor: 'BodyChartTemplateWhereUniqueInput',
      distinct: 'BodyChartTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bodyChartTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
