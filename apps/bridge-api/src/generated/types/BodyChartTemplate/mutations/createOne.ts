import { mutationField, nonNull } from 'nexus'

export const BodyChartTemplateCreateOneMutation = mutationField(
  'createOneBodyChartTemplate',
  {
    type: nonNull('BodyChartTemplate'),
    args: {
      data: nonNull('BodyChartTemplateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bodyChartTemplate.create({
        data,
        ...select,
      })
    },
  },
)
