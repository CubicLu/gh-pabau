import { mutationField, nonNull } from 'nexus'

export const CommunicationRecipientUpdateManyMutation = mutationField(
  'updateManyCommunicationRecipient',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CommunicationRecipientUpdateManyMutationInput'),
      where: 'CommunicationRecipientWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationRecipient.updateMany(args as any)
    },
  },
)
