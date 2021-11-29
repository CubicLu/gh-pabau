import { queryField, nonNull, list } from 'nexus'

export const LabProductTemplateFindManyQuery = queryField(
  'findManyLabProductTemplate',
  {
    type: nonNull(list(nonNull('LabProductTemplate'))),
    args: {
      where: 'LabProductTemplateWhereInput',
      orderBy: list('LabProductTemplateOrderByWithRelationInput'),
      cursor: 'LabProductTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LabProductTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.labProductTemplate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
