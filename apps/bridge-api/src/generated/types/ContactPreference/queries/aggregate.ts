import { queryField, list } from 'nexus'

export const ContactPreferenceAggregateQuery = queryField(
  'aggregateContactPreference',
  {
    type: 'AggregateContactPreference',
    args: {
      where: 'ContactPreferenceWhereInput',
      orderBy: list('ContactPreferenceOrderByWithRelationInput'),
      cursor: 'ContactPreferenceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPreference.aggregate({ ...args, ...select }) as any
    },
  },
)
