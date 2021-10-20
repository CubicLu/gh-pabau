import { queryField, list } from 'nexus'

export const ContactAlertAggregateQuery = queryField('aggregateContactAlert', {
  type: 'AggregateContactAlert',
  args: {
    where: 'ContactAlertWhereInput',
    orderBy: list('ContactAlertOrderByWithRelationInput'),
    cursor: 'ContactAlertWhereUniqueInput',
    distinct: 'ContactAlertScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactAlert.aggregate({ ...args, ...select }) as any
  },
})
