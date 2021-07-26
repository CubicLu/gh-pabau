import { mutationField, nonNull } from 'nexus'

export const CommunicationRecipientCreateOneMutation = mutationField(
  'createOneCommunicationRecipient',
  {
    type: nonNull('CommunicationRecipient'),
    args: {
      data: nonNull('CommunicationRecipientCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.communicationRecipient.create({
        data,
        ...select,
      })
    },
  },
)
