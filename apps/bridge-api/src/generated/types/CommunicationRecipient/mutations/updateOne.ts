import { mutationField, nonNull } from 'nexus'

export const CommunicationRecipientUpdateOneMutation = mutationField(
  'updateOneCommunicationRecipient',
  {
    type: nonNull('CommunicationRecipient'),
    args: {
      where: nonNull('CommunicationRecipientWhereUniqueInput'),
      data: nonNull('CommunicationRecipientUpdateInput'),
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
