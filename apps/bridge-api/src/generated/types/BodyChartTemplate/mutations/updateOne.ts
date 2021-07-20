import { mutationField, nonNull } from 'nexus'

export const BodyChartTemplateUpdateOneMutation = mutationField(
  'updateOneBodyChartTemplate',
  {
    type: nonNull('BodyChartTemplate'),
    args: {
      where: nonNull('BodyChartTemplateWhereUniqueInput'),
      data: nonNull('BodyChartTemplateUpdateInput'),
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
