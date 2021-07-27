import { queryField, nonNull } from 'nexus'

export const CommunicationProviderFindUniqueQuery = queryField(
  'findUniqueCommunicationProvider',
  {
    type: 'CommunicationProvider',
    args: {
      where: nonNull('CommunicationProviderWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.communicationProvider.findUnique({
        where,
        ...select,
      })
    },
  },
)
