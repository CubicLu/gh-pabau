import { mutationField, nonNull } from 'nexus'

export const CheckinApptUpsertOneMutation = mutationField(
  'upsertOneCheckinAppt',
  {
    type: nonNull('CheckinAppt'),
    args: {
      where: nonNull('CheckinApptWhereUniqueInput'),
      create: nonNull('CheckinApptCreateInput'),
      update: nonNull('CheckinApptUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinAppt.upsert({
        ...args,
        ...select,
      })
    },
  },
)
