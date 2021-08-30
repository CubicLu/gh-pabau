import { mutationField, nonNull } from 'nexus'

export const CommunicationContentCreateOneMutation = mutationField(
  'createOneCommunicationContent',
  {
    type: nonNull('CommunicationContent'),
    args: {
      data: nonNull('CommunicationContentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.communicationContent.create({
        data,
        ...select,
      })
    },
  },
)
