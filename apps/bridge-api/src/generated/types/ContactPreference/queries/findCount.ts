import { queryField, nonNull, list } from 'nexus'

export const ContactPreferenceFindCountQuery = queryField(
  'findManyContactPreferenceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByWithRelationInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactPreferenceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactPreference.count(args as any)
    },
  },
)
