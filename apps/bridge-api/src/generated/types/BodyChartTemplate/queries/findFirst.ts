import { queryField, list } from 'nexus'

export const BodyChartTemplateFindFirstQuery = queryField(
  'findFirstBodyChartTemplate',
  {
    type: 'BodyChartTemplate',
    args: {
      where: 'BodyChartTemplateWhereInput',
      orderBy: list('BodyChartTemplateOrderByWithRelationInput'),
      cursor: 'BodyChartTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BodyChartTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bodyChartTemplate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
