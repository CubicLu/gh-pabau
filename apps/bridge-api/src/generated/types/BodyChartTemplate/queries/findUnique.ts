import { queryField, nonNull } from 'nexus'

export const BodyChartTemplateFindUniqueQuery = queryField(
  'findUniqueBodyChartTemplate',
  {
    type: 'BodyChartTemplate',
    args: {
      where: nonNull('BodyChartTemplateWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bodyChartTemplate.findUnique({
        where,
        ...select,
      })
    },
  },
)
