import { mutationField, nonNull } from 'nexus'

export const CommunicationProviderUpsertOneMutation = mutationField(
  'upsertOneCommunicationProvider',
  {
    type: nonNull('CommunicationProvider'),
    args: {
      where: nonNull('CommunicationProviderWhereUniqueInput'),
      create: nonNull('CommunicationProviderCreateInput'),
      update: nonNull('CommunicationProviderUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationProvider.upsert({
        ...args,
        ...select,
      })
    },
  },
)
