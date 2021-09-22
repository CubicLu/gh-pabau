import { queryField, list } from 'nexus'

export const CmContactLabelAggregateQuery = queryField(
  'aggregateCmContactLabel',
  {
    type: 'AggregateCmContactLabel',
    args: {
      where: 'CmContactLabelWhereInput',
      orderBy: list('CmContactLabelOrderByWithRelationInput'),
      cursor: 'CmContactLabelWhereUniqueInput',
      distinct: 'CmContactLabelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLabel.aggregate({ ...args, ...select }) as any
    },
  },
)
