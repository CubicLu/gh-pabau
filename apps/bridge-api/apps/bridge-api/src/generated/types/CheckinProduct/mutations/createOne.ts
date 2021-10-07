import { mutationField, nonNull } from 'nexus'

export const CheckinProductCreateOneMutation = mutationField(
  'createOneCheckinProduct',
  {
    type: nonNull('CheckinProduct'),
    args: {
      data: nonNull('CheckinProductCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.checkinProduct.create({
        data,
        ...select,
      })
    },
  },
)
