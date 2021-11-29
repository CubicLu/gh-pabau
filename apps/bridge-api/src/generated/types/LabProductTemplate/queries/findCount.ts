import { queryField, nonNull, list } from 'nexus'

export const LabProductTemplateFindCountQuery = queryField(
  'findManyLabProductTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LabProductTemplateWhereInput',
      orderBy: list('LabProductTemplateOrderByWithRelationInput'),
      cursor: 'LabProductTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LabProductTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.labProductTemplate.count(args as any)
    },
  },
)
