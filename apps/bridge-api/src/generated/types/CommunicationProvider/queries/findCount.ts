import { queryField, nonNull, list } from 'nexus'

export const CommunicationProviderFindCountQuery = queryField(
  'findManyCommunicationProviderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationProviderWhereInput',
      orderBy: list('CommunicationProviderOrderByWithRelationInput'),
      cursor: 'CommunicationProviderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationProviderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationProvider.count(args as any)
    },
  },
)
