import { mutationField, nonNull } from 'nexus'

export const BodyChartTemplateUpdateManyMutation = mutationField(
  'updateManyBodyChartTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BodyChartTemplateWhereInput',
      data: nonNull('BodyChartTemplateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bodyChartTemplate.updateMany(args as any)
    },
  },
)
