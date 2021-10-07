import { queryField, nonNull, list } from 'nexus'

export const CommunicationHashFindCountQuery = queryField(
  'findManyCommunicationHashCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationHashWhereInput',
      orderBy: list('CommunicationHashOrderByWithRelationInput'),
      cursor: 'CommunicationHashWhereUniqueInput',
      distinct: 'CommunicationHashScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationHash.count(args as any)
    },
  },
)
