import { queryField, nonNull, list } from 'nexus'

export const CommunicationFindCountQuery = queryField(
  'findManyCommunicationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationWhereInput',
      orderBy: list('CommunicationOrderByWithRelationInput'),
      cursor: 'CommunicationWhereUniqueInput',
      distinct: 'CommunicationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communication.count(args as any)
    },
  },
)
