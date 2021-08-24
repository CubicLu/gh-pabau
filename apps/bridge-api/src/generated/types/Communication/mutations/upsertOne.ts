import { mutationField, nonNull } from 'nexus'

export const CommunicationUpsertOneMutation = mutationField(
  'upsertOneCommunication',
  {
    type: nonNull('Communication'),
    args: {
      where: nonNull('CommunicationWhereUniqueInput'),
      create: nonNull('CommunicationCreateInput'),
      update: nonNull('CommunicationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communication.upsert({
        ...args,
        ...select,
      })
    },
  },
)
