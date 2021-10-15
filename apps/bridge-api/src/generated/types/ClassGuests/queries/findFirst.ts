import { queryField, list } from 'nexus'

export const ClassGuestsFindFirstQuery = queryField('findFirstClassGuests', {
  type: 'ClassGuests',
  args: {
    where: 'ClassGuestsWhereInput',
    orderBy: list('ClassGuestsOrderByInput'),
    cursor: 'ClassGuestsWhereUniqueInput',
    distinct: 'ClassGuestsScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classGuests.findFirst({
      ...args,
      ...select,
    })
  },
})
