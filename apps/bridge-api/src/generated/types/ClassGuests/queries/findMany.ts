import { queryField, nonNull, list } from 'nexus'

export const ClassGuestsFindManyQuery = queryField('findManyClassGuests', {
  type: nonNull(list(nonNull('ClassGuests'))),
  args: {
    where: 'ClassGuestsWhereInput',
    orderBy: list('ClassGuestsOrderByWithRelationInput'),
    cursor: 'ClassGuestsWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassGuestsScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classGuests.findMany({
      ...args,
      ...select,
    })
  },
})
