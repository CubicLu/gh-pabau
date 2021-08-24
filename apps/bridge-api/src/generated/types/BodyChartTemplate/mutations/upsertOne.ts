import { mutationField, nonNull } from 'nexus'

export const BodyChartTemplateUpsertOneMutation = mutationField(
  'upsertOneBodyChartTemplate',
  {
    type: nonNull('BodyChartTemplate'),
    args: {
      where: nonNull('BodyChartTemplateWhereUniqueInput'),
      create: nonNull('BodyChartTemplateCreateInput'),
      update: nonNull('BodyChartTemplateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bodyChartTemplate.upsert({
        ...args,
        ...select,
      })
    },
  },
)
