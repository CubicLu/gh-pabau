import { mutationField, nonNull } from 'nexus'

export const CheckinApptDeleteOneMutation = mutationField(
  'deleteOneCheckinAppt',
  {
    type: 'CheckinAppt',
    args: {
      where: nonNull('CheckinApptWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.checkinAppt.delete({
        where,
        ...select,
      })
    },
  },
)
