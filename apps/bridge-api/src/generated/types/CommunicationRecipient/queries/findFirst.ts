import { queryField, list } from 'nexus'

export const CommunicationRecipientFindFirstQuery = queryField(
  'findFirstCommunicationRecipient',
  {
    type: 'CommunicationRecipient',
    args: {
      where: 'CommunicationRecipientWhereInput',
      orderBy: list('CommunicationRecipientOrderByWithRelationInput'),
      cursor: 'CommunicationRecipientWhereUniqueInput',
      distinct: 'CommunicationRecipientScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationRecipient.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
