import { queryField, nonNull, list } from 'nexus'

export const ClassGuestsFindCountQuery = queryField(
  'findManyClassGuestsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassGuestsWhereInput',
      orderBy: list('ClassGuestsOrderByInput'),
      cursor: 'ClassGuestsWhereUniqueInput',
      distinct: 'ClassGuestsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classGuests.count(args as any)
    },
  },
)
