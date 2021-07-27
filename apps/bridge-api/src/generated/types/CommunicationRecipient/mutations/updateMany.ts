import { mutationField, nonNull } from 'nexus'

export const CommunicationRecipientUpdateManyMutation = mutationField(
  'updateManyCommunicationRecipient',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CommunicationRecipientWhereInput',
      data: nonNull('CommunicationRecipientUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationRecipient.updateMany(args as any)
    },
  },
)
