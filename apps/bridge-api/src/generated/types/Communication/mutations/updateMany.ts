import { mutationField, nonNull } from 'nexus'

export const CommunicationUpdateManyMutation = mutationField(
  'updateManyCommunication',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CommunicationUpdateManyMutationInput'),
      where: 'CommunicationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communication.updateMany(args as any)
    },
  },
)
