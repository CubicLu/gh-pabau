import { mutationField, nonNull } from 'nexus'

export const CommunicationRecipientUpdateOneMutation = mutationField(
  'updateOneCommunicationRecipient',
  {
    type: nonNull('CommunicationRecipient'),
    args: {
      data: nonNull('CommunicationRecipientUpdateInput'),
      where: nonNull('CommunicationRecipientWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.communicationRecipient.update({
        where,
        data,
        ...select,
      })
    },
  },
)
