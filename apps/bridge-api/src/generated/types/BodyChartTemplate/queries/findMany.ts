import { queryField, nonNull, list } from 'nexus'

export const BodyChartTemplateFindManyQuery = queryField(
  'findManyBodyChartTemplate',
  {
    type: nonNull(list(nonNull('BodyChartTemplate'))),
    args: {
      where: 'BodyChartTemplateWhereInput',
      orderBy: list('BodyChartTemplateOrderByWithRelationInput'),
      cursor: 'BodyChartTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BodyChartTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bodyChartTemplate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
