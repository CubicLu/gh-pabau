import { queryField, nonNull, list } from 'nexus'

export const CommunicationContentFindCountQuery = queryField(
  'findManyCommunicationContentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationContentWhereInput',
      orderBy: list('CommunicationContentOrderByWithRelationInput'),
      cursor: 'CommunicationContentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationContentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationContent.count(args as any)
    },
  },
)
