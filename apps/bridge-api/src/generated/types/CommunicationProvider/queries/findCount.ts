import { queryField, nonNull, list } from 'nexus'

export const CommunicationProviderFindCountQuery = queryField(
  'findManyCommunicationProviderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationProviderWhereInput',
      orderBy: list('CommunicationProviderOrderByInput'),
      cursor: 'CommunicationProviderWhereUniqueInput',
      distinct: 'CommunicationProviderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationProvider.count(args as any)
    },
  },
)
