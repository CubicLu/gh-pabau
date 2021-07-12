import { mutationField, nonNull } from 'nexus'

export const BodyChartTemplateDeleteOneMutation = mutationField(
  'deleteOneBodyChartTemplate',
  {
    type: 'BodyChartTemplate',
    args: {
      where: nonNull('BodyChartTemplateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bodyChartTemplate.delete({
        where,
        ...select,
      })
    },
  },
)
