import { mutationField, nonNull } from 'nexus'

export const CommunicationContentUpdateManyMutation = mutationField(
  'updateManyCommunicationContent',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CommunicationContentWhereInput',
      data: nonNull('CommunicationContentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationContent.updateMany(args as any)
    },
  },
)
