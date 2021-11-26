import { mutationField, nonNull } from 'nexus'

export const CommunicationUpdateOneMutation = mutationField(
  'updateOneCommunication',
  {
    type: nonNull('Communication'),
    args: {
      data: nonNull('CommunicationUpdateInput'),
      where: nonNull('CommunicationWhereUniqueInput'),
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
