import { mutationField, nonNull } from 'nexus'

export const CheckinApptUpdateOneMutation = mutationField(
  'updateOneCheckinAppt',
  {
    type: nonNull('CheckinAppt'),
    args: {
      data: nonNull('CheckinApptUpdateInput'),
      where: nonNull('CheckinApptWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.checkinAppt.update({
        where,
        data,
        ...select,
      })
    },
  },
)
