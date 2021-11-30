import { queryField, nonNull, list } from 'nexus'

export const ContactPreferenceFindManyQuery = queryField(
  'findManyContactPreference',
  {
    type: nonNull(list(nonNull('ContactPreference'))),
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByWithRelationInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactPreferenceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPreference.findMany({
        ...args,
        ...select,
      })
    },
  },
)
