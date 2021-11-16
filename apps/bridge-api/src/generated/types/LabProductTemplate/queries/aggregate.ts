import { queryField, list } from 'nexus'

export const LabProductTemplateAggregateQuery = queryField(
  'aggregateLabProductTemplate',
  {
    type: 'AggregateLabProductTemplate',
    args: {
      where: 'LabProductTemplateWhereInput',
      orderBy: list('LabProductTemplateOrderByWithRelationInput'),
      cursor: 'LabProductTemplateWhereUniqueInput',
      distinct: 'LabProductTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.labProductTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
