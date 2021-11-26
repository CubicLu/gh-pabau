import { mutationField, nonNull } from 'nexus'

export const BodyChartTemplateUpdateManyMutation = mutationField(
  'updateManyBodyChartTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BodyChartTemplateUpdateManyMutationInput'),
      where: 'BodyChartTemplateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bodyChartTemplate.updateMany(args as any)
    },
  },
)
