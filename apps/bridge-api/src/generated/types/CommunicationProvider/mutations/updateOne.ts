import { mutationField, nonNull } from 'nexus'

export const CommunicationProviderUpdateOneMutation = mutationField(
  'updateOneCommunicationProvider',
  {
    type: nonNull('CommunicationProvider'),
    args: {
      data: nonNull('CommunicationProviderUpdateInput'),
      where: nonNull('CommunicationProviderWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.communicationProvider.update({
        where,
        data,
        ...select,
      })
    },
  },
)
