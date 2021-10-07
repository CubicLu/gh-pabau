import { mutationField, nonNull } from 'nexus'

export const CommunicationUpdateOneMutation = mutationField(
  'updateOneCommunication',
  {
    type: nonNull('Communication'),
    args: {
      where: nonNull('CommunicationWhereUniqueInput'),
      data: nonNull('CommunicationUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.communication.update({
        where,
        data,
        ...select,
      })
    },
  },
)
