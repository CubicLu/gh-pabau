import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesUpdateOneMutation = mutationField(
  'updateOneCheckinAverages',
  {
    type: nonNull('CheckinAverages'),
    args: {
      where: nonNull('CheckinAveragesWhereUniqueInput'),
      data: nonNull('CheckinAveragesUpdateInput'),
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
