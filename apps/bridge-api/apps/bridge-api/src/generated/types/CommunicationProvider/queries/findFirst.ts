import { queryField, list } from 'nexus'

export const CommunicationProviderFindFirstQuery = queryField(
  'findFirstCommunicationProvider',
  {
    type: 'CommunicationProvider',
    args: {
      where: 'CommunicationProviderWhereInput',
      orderBy: list('CommunicationProviderOrderByWithRelationInput'),
      cursor: 'CommunicationProviderWhereUniqueInput',
      distinct: 'CommunicationProviderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationProvider.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
