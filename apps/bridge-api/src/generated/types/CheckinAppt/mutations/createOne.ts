import { mutationField, nonNull } from 'nexus'

export const CheckinApptCreateOneMutation = mutationField(
  'createOneCheckinAppt',
  {
    type: nonNull('CheckinAppt'),
    args: {
      data: nonNull('CheckinApptCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.checkinAppt.create({
        data,
        ...select,
      })
    },
  },
)
