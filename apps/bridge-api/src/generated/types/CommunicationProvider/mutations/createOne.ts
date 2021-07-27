import { mutationField, nonNull } from 'nexus'

export const CommunicationProviderCreateOneMutation = mutationField(
  'createOneCommunicationProvider',
  {
    type: nonNull('CommunicationProvider'),
    args: {
      data: nonNull('CommunicationProviderCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.communicationProvider.create({
        data,
        ...select,
      })
    },
  },
)
