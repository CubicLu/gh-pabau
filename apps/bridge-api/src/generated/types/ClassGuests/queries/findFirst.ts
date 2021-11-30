import { queryField, list } from 'nexus'

export const ClassGuestsFindFirstQuery = queryField('findFirstClassGuests', {
  type: 'ClassGuests',
  args: {
    where: 'ClassGuestsWhereInput',
    orderBy: list('ClassGuestsOrderByWithRelationInput'),
    cursor: 'ClassGuestsWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassGuestsScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classGuests.findFirst({
      ...args,
      ...select,
    })
  },
})
