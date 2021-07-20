import { mutationField, nonNull } from 'nexus'

export const CheckinApptUpdateOneMutation = mutationField(
  'updateOneCheckinAppt',
  {
    type: nonNull('CheckinAppt'),
    args: {
      where: nonNull('CheckinApptWhereUniqueInput'),
      data: nonNull('CheckinApptUpdateInput'),
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
