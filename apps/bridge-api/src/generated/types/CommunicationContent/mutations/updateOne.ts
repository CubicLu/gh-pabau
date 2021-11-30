import { mutationField, nonNull } from 'nexus'

export const CommunicationContentUpdateOneMutation = mutationField(
  'updateOneCommunicationContent',
  {
    type: nonNull('CommunicationContent'),
    args: {
      data: nonNull('CommunicationContentUpdateInput'),
      where: nonNull('CommunicationContentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.communicationContent.update({
        where,
        data,
        ...select,
      })
    },
  },
)
