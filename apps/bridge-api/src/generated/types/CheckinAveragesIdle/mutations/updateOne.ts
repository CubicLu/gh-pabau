import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesIdleUpdateOneMutation = mutationField(
  'updateOneCheckinAveragesIdle',
  {
    type: nonNull('CheckinAveragesIdle'),
    args: {
      where: nonNull('CheckinAveragesIdleWhereUniqueInput'),
      data: nonNull('CheckinAveragesIdleUpdateInput'),
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
