import { queryField, nonNull, list } from 'nexus'

export const ContactPreferenceFindManyQuery = queryField(
  'findManyContactPreference',
  {
    type: nonNull(list(nonNull('ContactPreference'))),
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      distinct: 'ContactPreferenceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPreference.findMany({
        ...args,
        ...select,
      })
    },
  },
)
