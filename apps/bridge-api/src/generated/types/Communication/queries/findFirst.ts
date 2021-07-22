import { queryField, list } from 'nexus'

export const CommunicationFindFirstQuery = queryField(
  'findFirstCommunication',
  {
    type: 'Communication',
    args: {
      where: 'CommunicationWhereInput',
      orderBy: list('CommunicationOrderByInput'),
      cursor: 'CommunicationWhereUniqueInput',
      distinct: 'CommunicationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communication.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
