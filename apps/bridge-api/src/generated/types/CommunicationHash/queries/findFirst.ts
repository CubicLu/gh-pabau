import { queryField, list } from 'nexus'

export const CommunicationHashFindFirstQuery = queryField(
  'findFirstCommunicationHash',
  {
    type: 'CommunicationHash',
    args: {
      where: 'CommunicationHashWhereInput',
      orderBy: list('CommunicationHashOrderByWithRelationInput'),
      cursor: 'CommunicationHashWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationHashScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationHash.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
