import { queryField, nonNull } from 'nexus'

export const ClassGuestsFindUniqueQuery = queryField('findUniqueClassGuests', {
  type: 'ClassGuests',
  args: {
    where: nonNull('ClassGuestsWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.classGuests.findUnique({
      where,
      ...select,
    })
  },
})
