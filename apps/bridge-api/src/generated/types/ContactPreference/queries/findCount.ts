import { queryField, nonNull, list } from 'nexus'

export const ContactPreferenceFindCountQuery = queryField(
  'findManyContactPreferenceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      distinct: 'ContactPreferenceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactPreference.count(args as any)
    },
  },
)
