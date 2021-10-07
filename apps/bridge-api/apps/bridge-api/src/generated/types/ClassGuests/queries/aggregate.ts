import { queryField, list } from 'nexus'

export const ClassGuestsAggregateQuery = queryField('aggregateClassGuests', {
  type: 'AggregateClassGuests',
  args: {
    where: 'ClassGuestsWhereInput',
    orderBy: list('ClassGuestsOrderByWithRelationInput'),
    cursor: 'ClassGuestsWhereUniqueInput',
    distinct: 'ClassGuestsScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classGuests.aggregate({ ...args, ...select }) as any
  },
})
