import { mutationField, nonNull } from 'nexus'

export const ClassGuestsCreateOneMutation = mutationField(
  'createOneClassGuests',
  {
    type: nonNull('ClassGuests'),
    args: {
      data: nonNull('ClassGuestsCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classGuests.create({
        data,
        ...select,
      })
    },
  },
)
