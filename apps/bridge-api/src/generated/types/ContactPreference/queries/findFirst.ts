import { queryField, list } from 'nexus'

export const ContactPreferenceFindFirstQuery = queryField(
  'findFirstContactPreference',
  {
    type: 'ContactPreference',
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      distinct: 'ContactPreferenceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPreference.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
