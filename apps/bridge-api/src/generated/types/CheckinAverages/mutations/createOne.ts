import { mutationField, nonNull } from 'nexus'

export const CheckinAveragesCreateOneMutation = mutationField(
  'createOneCheckinAverages',
  {
    type: nonNull('CheckinAverages'),
    args: {
      data: nonNull('CheckinAveragesCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.checkinAverages.create({
        data,
        ...select,
      })
    },
  },
)
