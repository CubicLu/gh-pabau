import { queryField, nonNull, list } from 'nexus'

export const LabProductTemplateFindManyQuery = queryField(
  'findManyLabProductTemplate',
  {
    type: nonNull(list(nonNull('LabProductTemplate'))),
    args: {
      where: 'LabProductTemplateWhereInput',
      orderBy: list('LabProductTemplateOrderByWithRelationInput'),
      cursor: 'LabProductTemplateWhereUniqueInput',
      distinct: 'LabProductTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.labProductTemplate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
