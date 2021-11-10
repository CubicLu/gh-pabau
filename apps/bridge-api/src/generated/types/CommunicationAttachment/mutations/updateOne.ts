import { mutationField, nonNull } from 'nexus'

export const CommunicationAttachmentUpdateOneMutation = mutationField(
  'updateOneCommunicationAttachment',
  {
    type: nonNull('CommunicationAttachment'),
    args: {
      where: nonNull('CommunicationAttachmentWhereUniqueInput'),
      data: nonNull('CommunicationAttachmentUpdateInput'),
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
