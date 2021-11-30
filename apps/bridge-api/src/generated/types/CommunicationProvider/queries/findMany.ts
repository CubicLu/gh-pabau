import { queryField, nonNull, list } from 'nexus'

export const CommunicationProviderFindManyQuery = queryField(
  'findManyCommunicationProvider',
  {
    type: nonNull(list(nonNull('CommunicationProvider'))),
    args: {
      where: 'CommunicationProviderWhereInput',
      orderBy: list('CommunicationProviderOrderByWithRelationInput'),
      cursor: 'CommunicationProviderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationProviderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationProvider.findMany({
        ...args,
        ...select,
      })
    },
  },
)
