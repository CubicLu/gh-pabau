import { mutationField, nonNull } from 'nexus'

export const CommunicationAttachmentUpdateOneMutation = mutationField(
  'updateOneCommunicationAttachment',
  {
    type: nonNull('CommunicationAttachment'),
    args: {
      data: nonNull('CommunicationAttachmentUpdateInput'),
      where: nonNull('CommunicationAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.communicationAttachment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
