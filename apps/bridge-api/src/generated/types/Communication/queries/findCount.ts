import { queryField, nonNull, list } from 'nexus'

export const CommunicationFindCountQuery = queryField(
  'findManyCommunicationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationWhereInput',
      orderBy: list('CommunicationOrderByWithRelationInput'),
      cursor: 'CommunicationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communication.count(args as any)
    },
  },
)
