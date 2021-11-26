import { queryField, list } from 'nexus'

export const CommunicationRecipientFindFirstQuery = queryField(
  'findFirstCommunicationRecipient',
  {
    type: 'CommunicationRecipient',
    args: {
      where: 'CommunicationRecipientWhereInput',
      orderBy: list('CommunicationRecipientOrderByWithRelationInput'),
      cursor: 'CommunicationRecipientWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationRecipientScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationRecipient.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
