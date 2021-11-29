import { queryField, nonNull, list } from 'nexus'

export const CommunicationContentFindManyQuery = queryField(
  'findManyCommunicationContent',
  {
    type: nonNull(list(nonNull('CommunicationContent'))),
    args: {
      where: 'CommunicationContentWhereInput',
      orderBy: list('CommunicationContentOrderByWithRelationInput'),
      cursor: 'CommunicationContentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationContentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationContent.findMany({
        ...args,
        ...select,
      })
    },
  },
)
