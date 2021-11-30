import { queryField, list } from 'nexus'

export const ContactPreferenceFindFirstQuery = queryField(
  'findFirstContactPreference',
  {
    type: 'ContactPreference',
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByWithRelationInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactPreferenceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPreference.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
