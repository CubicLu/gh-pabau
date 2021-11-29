import { queryField, nonNull, list } from 'nexus'

export const CommunicationHashFindCountQuery = queryField(
  'findManyCommunicationHashCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationHashWhereInput',
      orderBy: list('CommunicationHashOrderByWithRelationInput'),
      cursor: 'CommunicationHashWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationHashScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationHash.count(args as any)
    },
  },
)
