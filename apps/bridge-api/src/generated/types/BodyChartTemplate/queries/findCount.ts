import { queryField, nonNull, list } from 'nexus'

export const BodyChartTemplateFindCountQuery = queryField(
  'findManyBodyChartTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BodyChartTemplateWhereInput',
      orderBy: list('BodyChartTemplateOrderByInput'),
      cursor: 'BodyChartTemplateWhereUniqueInput',
      distinct: 'BodyChartTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bodyChartTemplate.count(args as any)
    },
  },
)
