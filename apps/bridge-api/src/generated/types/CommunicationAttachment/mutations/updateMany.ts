import { mutationField, nonNull } from 'nexus'

export const CommunicationAttachmentUpdateManyMutation = mutationField(
  'updateManyCommunicationAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CommunicationAttachmentWhereInput',
      data: nonNull('CommunicationAttachmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationAttachment.updateMany(args as any)
    },
  },
)
