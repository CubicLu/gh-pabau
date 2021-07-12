import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesUpsertOneMutation = mutationField(
  'upsertOneCheckinAverages',
  {
    type: nonNull('CheckinAverages'),
    args: {
      where: nonNull('CheckinAveragesWhereUniqueInput'),
      create: nonNull('CheckinAveragesCreateInput'),
      update: nonNull('CheckinAveragesUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAverages.upsert({
        ...args,
        ...select,
      })
    },
  },
)
