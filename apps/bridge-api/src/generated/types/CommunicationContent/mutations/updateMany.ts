import { mutationField, nonNull } from 'nexus'

export const CommunicationContentUpdateManyMutation = mutationField(
  'updateManyCommunicationContent',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CommunicationContentUpdateManyMutationInput'),
      where: 'CommunicationContentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationContent.updateMany(args as any)
    },
  },
)
