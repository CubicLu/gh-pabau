import { queryField, nonNull, list } from 'nexus'

export const BodyChartTemplateFindCountQuery = queryField(
  'findManyBodyChartTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BodyChartTemplateWhereInput',
      orderBy: list('BodyChartTemplateOrderByWithRelationInput'),
      cursor: 'BodyChartTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BodyChartTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bodyChartTemplate.count(args as any)
    },
  },
)
