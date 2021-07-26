import { mutationField, nonNull } from 'nexus'

export const CommunicationProviderUpdateManyMutation = mutationField(
  'updateManyCommunicationProvider',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CommunicationProviderWhereInput',
      data: nonNull('CommunicationProviderUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationProvider.updateMany(args as any)
    },
  },
)
