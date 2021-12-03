import { mutationField, nonNull } from 'nexus'

export const CommunicationProviderUpdateManyMutation = mutationField(
  'updateManyCommunicationProvider',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CommunicationProviderUpdateManyMutationInput'),
      where: 'CommunicationProviderWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationProvider.updateMany(args as any)
    },
  },
)
