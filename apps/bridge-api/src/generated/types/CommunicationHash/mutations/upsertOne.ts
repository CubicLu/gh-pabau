import { mutationField, nonNull } from 'nexus'

export const CommunicationHashUpsertOneMutation = mutationField(
  'upsertOneCommunicationHash',
  {
    type: nonNull('CommunicationHash'),
    args: {
      where: nonNull('CommunicationHashWhereUniqueInput'),
      create: nonNull('CommunicationHashCreateInput'),
      update: nonNull('CommunicationHashUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationHash.upsert({
        ...args,
        ...select,
      })
    },
  },
)
