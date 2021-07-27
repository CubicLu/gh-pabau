import { mutationField, nonNull } from 'nexus'

export const CommunicationRecipientUpsertOneMutation = mutationField(
  'upsertOneCommunicationRecipient',
  {
    type: nonNull('CommunicationRecipient'),
    args: {
      where: nonNull('CommunicationRecipientWhereUniqueInput'),
      create: nonNull('CommunicationRecipientCreateInput'),
      update: nonNull('CommunicationRecipientUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationRecipient.upsert({
        ...args,
        ...select,
      })
    },
  },
)
