import { mutationField, nonNull } from 'nexus'

export const CommunicationAttachmentUpsertOneMutation = mutationField(
  'upsertOneCommunicationAttachment',
  {
    type: nonNull('CommunicationAttachment'),
    args: {
      where: nonNull('CommunicationAttachmentWhereUniqueInput'),
      create: nonNull('CommunicationAttachmentCreateInput'),
      update: nonNull('CommunicationAttachmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationAttachment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
