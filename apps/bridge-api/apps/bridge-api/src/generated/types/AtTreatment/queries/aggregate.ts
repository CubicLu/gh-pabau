import { queryField, list } from 'nexus'

export const AtTreatmentAggregateQuery = queryField('aggregateAtTreatment', {
  type: 'AggregateAtTreatment',
  args: {
    where: 'AtTreatmentWhereInput',
    orderBy: list('AtTreatmentOrderByWithRelationInput'),
    cursor: 'AtTreatmentWhereUniqueInput',
    distinct: 'AtTreatmentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atTreatment.aggregate({ ...args, ...select }) as any
  },
})
