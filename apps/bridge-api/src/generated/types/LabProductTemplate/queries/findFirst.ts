import { queryField, list } from 'nexus'

export const LabProductTemplateFindFirstQuery = queryField(
  'findFirstLabProductTemplate',
  {
    type: 'LabProductTemplate',
    args: {
      where: 'LabProductTemplateWhereInput',
      orderBy: list('LabProductTemplateOrderByWithRelationInput'),
      cursor: 'LabProductTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LabProductTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.labProductTemplate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
