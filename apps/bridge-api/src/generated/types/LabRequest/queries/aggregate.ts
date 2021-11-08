import { queryField, list } from 'nexus'

export const LabRequestAggregateQuery = queryField('aggregateLabRequest', {
  type: 'AggregateLabRequest',
  args: {
    where: 'LabRequestWhereInput',
    orderBy: list('LabRequestOrderByWithRelationInput'),
    cursor: 'LabRequestWhereUniqueInput',
    distinct: 'LabRequestScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.labRequest.aggregate({ ...args, ...select }) as any
  },
})
