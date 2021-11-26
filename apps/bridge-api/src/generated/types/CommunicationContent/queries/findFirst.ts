import { queryField, list } from 'nexus'

export const CommunicationContentFindFirstQuery = queryField(
  'findFirstCommunicationContent',
  {
    type: 'CommunicationContent',
    args: {
      where: 'CommunicationContentWhereInput',
      orderBy: list('CommunicationContentOrderByWithRelationInput'),
      cursor: 'CommunicationContentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationContentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationContent.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
