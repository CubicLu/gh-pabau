import { queryField, list } from 'nexus'

export const CommunicationFindFirstQuery = queryField(
  'findFirstCommunication',
  {
    type: 'Communication',
    args: {
      where: 'CommunicationWhereInput',
      orderBy: list('CommunicationOrderByWithRelationInput'),
      cursor: 'CommunicationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communication.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
