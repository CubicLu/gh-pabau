import { queryField, list } from 'nexus'

export const ContactPreferenceAggregateQuery = queryField(
  'aggregateContactPreference',
  {
    type: 'AggregateContactPreference',
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      distinct: 'ContactPreferenceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPreference.aggregate({ ...args, ...select }) as any
    },
  },
)
