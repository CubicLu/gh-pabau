import { queryField, nonNull, list } from 'nexus'

export const CommunicationHashFindManyQuery = queryField(
  'findManyCommunicationHash',
  {
    type: nonNull(list(nonNull('CommunicationHash'))),
    args: {
      where: 'CommunicationHashWhereInput',
      orderBy: list('CommunicationHashOrderByWithRelationInput'),
      cursor: 'CommunicationHashWhereUniqueInput',
      distinct: 'CommunicationHashScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationHash.findMany({
        ...args,
        ...select,
      })
    },
  },
)
