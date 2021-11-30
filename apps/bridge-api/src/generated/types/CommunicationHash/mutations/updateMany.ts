import { mutationField, nonNull } from 'nexus'

export const CommunicationHashUpdateManyMutation = mutationField(
  'updateManyCommunicationHash',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CommunicationHashUpdateManyMutationInput'),
      where: 'CommunicationHashWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationHash.updateMany(args as any)
    },
  },
)
