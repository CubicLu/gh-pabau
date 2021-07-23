import { queryField, nonNull, list } from 'nexus'

export const CommunicationContentFindCountQuery = queryField(
  'findManyCommunicationContentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationContentWhereInput',
      orderBy: list('CommunicationContentOrderByInput'),
      cursor: 'CommunicationContentWhereUniqueInput',
      distinct: 'CommunicationContentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationContent.count(args as any)
    },
  },
)
