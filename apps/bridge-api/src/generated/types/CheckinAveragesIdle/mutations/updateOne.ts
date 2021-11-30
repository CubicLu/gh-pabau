import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesIdleUpdateOneMutation = mutationField(
  'updateOneCheckinAveragesIdle',
  {
    type: nonNull('CheckinAveragesIdle'),
    args: {
      data: nonNull('CheckinAveragesIdleUpdateInput'),
      where: nonNull('CheckinAveragesIdleWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.checkinAveragesIdle.update({
        where,
        data,
        ...select,
      })
    },
  },
)
