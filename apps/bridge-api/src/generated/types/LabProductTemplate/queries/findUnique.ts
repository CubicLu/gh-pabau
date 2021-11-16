import { queryField, nonNull } from 'nexus'

export const LabProductTemplateFindUniqueQuery = queryField(
  'findUniqueLabProductTemplate',
  {
    type: 'LabProductTemplate',
    args: {
      where: nonNull('LabProductTemplateWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.labProductTemplate.findUnique({
        where,
        ...select,
      })
    },
  },
)
