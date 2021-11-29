import { mutationField, nonNull } from 'nexus'

export const CommunicationAttachmentUpdateManyMutation = mutationField(
  'updateManyCommunicationAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CommunicationAttachmentUpdateManyMutationInput'),
      where: 'CommunicationAttachmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationAttachment.updateMany(args as any)
    },
  },
)
