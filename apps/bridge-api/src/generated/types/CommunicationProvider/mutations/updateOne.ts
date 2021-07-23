import { mutationField, nonNull } from 'nexus'

export const CommunicationProviderUpdateOneMutation = mutationField(
  'updateOneCommunicationProvider',
  {
    type: nonNull('CommunicationProvider'),
    args: {
      where: nonNull('CommunicationProviderWhereUniqueInput'),
      data: nonNull('CommunicationProviderUpdateInput'),
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
