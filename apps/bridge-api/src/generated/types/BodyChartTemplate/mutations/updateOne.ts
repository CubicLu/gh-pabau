import { mutationField, nonNull } from 'nexus'

export const BodyChartTemplateUpdateOneMutation = mutationField(
  'updateOneBodyChartTemplate',
  {
    type: nonNull('BodyChartTemplate'),
    args: {
      data: nonNull('BodyChartTemplateUpdateInput'),
      where: nonNull('BodyChartTemplateWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bodyChartTemplate.update({
        where,
        data,
        ...select,
      })
    },
  },
)
