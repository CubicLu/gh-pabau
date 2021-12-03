import { queryField, list } from 'nexus'

export const LabProductTemplateAggregateQuery = queryField(
  'aggregateLabProductTemplate',
  {
    type: 'AggregateLabProductTemplate',
    args: {
      where: 'LabProductTemplateWhereInput',
      orderBy: list('LabProductTemplateOrderByWithRelationInput'),
      cursor: 'LabProductTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.labProductTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
