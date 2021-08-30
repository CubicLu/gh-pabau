import { mutationField, nonNull } from 'nexus'

export const CommunicationHashUpdateManyMutation = mutationField(
  'updateManyCommunicationHash',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CommunicationHashWhereInput',
      data: nonNull('CommunicationHashUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationHash.updateMany(args as any)
    },
  },
)
