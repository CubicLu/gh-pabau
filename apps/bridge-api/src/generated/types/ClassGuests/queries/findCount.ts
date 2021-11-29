import { queryField, nonNull, list } from 'nexus'

export const ClassGuestsFindCountQuery = queryField(
  'findManyClassGuestsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassGuestsWhereInput',
      orderBy: list('ClassGuestsOrderByWithRelationInput'),
      cursor: 'ClassGuestsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassGuestsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classGuests.count(args as any)
    },
  },
)
