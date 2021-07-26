import { mutationField, nonNull } from 'nexus'

export const CommunicationUpdateManyMutation = mutationField(
  'updateManyCommunication',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CommunicationWhereInput',
      data: nonNull('CommunicationUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communication.updateMany(args as any)
    },
  },
)
