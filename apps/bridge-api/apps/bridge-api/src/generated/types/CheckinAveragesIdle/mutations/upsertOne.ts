import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesIdleUpsertOneMutation = mutationField(
  'upsertOneCheckinAveragesIdle',
  {
    type: nonNull('CheckinAveragesIdle'),
    args: {
      where: nonNull('CheckinAveragesIdleWhereUniqueInput'),
      create: nonNull('CheckinAveragesIdleCreateInput'),
      update: nonNull('CheckinAveragesIdleUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAveragesIdle.upsert({
        ...args,
        ...select,
      })
    },
  },
)
