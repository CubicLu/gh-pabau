import { queryField, list } from 'nexus'

export const CommunicationHashFindFirstQuery = queryField(
  'findFirstCommunicationHash',
  {
    type: 'CommunicationHash',
    args: {
      where: 'CommunicationHashWhereInput',
      orderBy: list('CommunicationHashOrderByWithRelationInput'),
      cursor: 'CommunicationHashWhereUniqueInput',
      distinct: 'CommunicationHashScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationHash.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
