import { mutationField, nonNull } from 'nexus'

export const CommunicationAttachmentCreateOneMutation = mutationField(
  'createOneCommunicationAttachment',
  {
    type: nonNull('CommunicationAttachment'),
    args: {
      data: nonNull('CommunicationAttachmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.communicationAttachment.create({
        data,
        ...select,
      })
    },
  },
)
