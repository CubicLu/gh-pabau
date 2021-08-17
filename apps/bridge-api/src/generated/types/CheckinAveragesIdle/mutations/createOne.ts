import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesIdleCreateOneMutation = mutationField(
  'createOneCheckinAveragesIdle',
  {
    type: nonNull('CheckinAveragesIdle'),
    args: {
      data: nonNull('CheckinAveragesIdleCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.checkinAveragesIdle.create({
        data,
        ...select,
      })
    },
  },
)
