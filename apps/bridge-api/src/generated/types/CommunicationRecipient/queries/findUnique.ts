import { queryField, nonNull } from 'nexus'

export const CommunicationRecipientFindUniqueQuery = queryField(
  'findUniqueCommunicationRecipient',
  {
    type: 'CommunicationRecipient',
    args: {
      where: nonNull('CommunicationRecipientWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.communicationRecipient.findUnique({
        where,
        ...select,
      })
    },
  },
)
