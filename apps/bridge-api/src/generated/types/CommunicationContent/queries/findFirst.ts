import { queryField, list } from 'nexus'

export const CommunicationContentFindFirstQuery = queryField(
  'findFirstCommunicationContent',
  {
    type: 'CommunicationContent',
    args: {
      where: 'CommunicationContentWhereInput',
      orderBy: list('CommunicationContentOrderByInput'),
      cursor: 'CommunicationContentWhereUniqueInput',
      distinct: 'CommunicationContentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationContent.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
