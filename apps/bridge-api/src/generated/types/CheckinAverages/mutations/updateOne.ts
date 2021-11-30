import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesUpdateOneMutation = mutationField(
  'updateOneCheckinAverages',
  {
    type: nonNull('CheckinAverages'),
    args: {
      data: nonNull('CheckinAveragesUpdateInput'),
      where: nonNull('CheckinAveragesWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.checkinAverages.update({
        where,
        data,
        ...select,
      })
    },
  },
)
