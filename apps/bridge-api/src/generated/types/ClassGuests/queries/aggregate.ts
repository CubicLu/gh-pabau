import { queryField, list } from 'nexus'

export const ClassGuestsAggregateQuery = queryField('aggregateClassGuests', {
  type: 'AggregateClassGuests',
  args: {
    where: 'ClassGuestsWhereInput',
    orderBy: list('ClassGuestsOrderByWithRelationInput'),
    cursor: 'ClassGuestsWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classGuests.aggregate({ ...args, ...select }) as any
  },
})
