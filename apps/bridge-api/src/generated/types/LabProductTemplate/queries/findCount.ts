import { queryField, nonNull, list } from 'nexus'

export const LabProductTemplateFindCountQuery = queryField(
  'findManyLabProductTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LabProductTemplateWhereInput',
      orderBy: list('LabProductTemplateOrderByWithRelationInput'),
      cursor: 'LabProductTemplateWhereUniqueInput',
      distinct: 'LabProductTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.labProductTemplate.count(args as any)
    },
  },
)
