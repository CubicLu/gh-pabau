import { queryField, nonNull, list } from 'nexus'

export const CommunicationHashFindManyQuery = queryField(
  'findManyCommunicationHash',
  {
    type: nonNull(list(nonNull('CommunicationHash'))),
    args: {
      where: 'CommunicationHashWhereInput',
      orderBy: list('CommunicationHashOrderByWithRelationInput'),
      cursor: 'CommunicationHashWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationHashScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationHash.findMany({
        ...args,
        ...select,
      })
    },
  },
)
