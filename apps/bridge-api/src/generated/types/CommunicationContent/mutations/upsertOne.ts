import { mutationField, nonNull } from 'nexus'

export const CommunicationContentUpsertOneMutation = mutationField(
  'upsertOneCommunicationContent',
  {
    type: nonNull('CommunicationContent'),
    args: {
      where: nonNull('CommunicationContentWhereUniqueInput'),
      create: nonNull('CommunicationContentCreateInput'),
      update: nonNull('CommunicationContentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationContent.upsert({
        ...args,
        ...select,
      })
    },
  },
)
