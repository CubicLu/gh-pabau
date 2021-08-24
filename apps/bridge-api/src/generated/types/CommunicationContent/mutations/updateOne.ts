import { mutationField, nonNull } from 'nexus'

export const CommunicationContentUpdateOneMutation = mutationField(
  'updateOneCommunicationContent',
  {
    type: nonNull('CommunicationContent'),
    args: {
      where: nonNull('CommunicationContentWhereUniqueInput'),
      data: nonNull('CommunicationContentUpdateInput'),
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
