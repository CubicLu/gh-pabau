import { mutationField, nonNull } from 'nexus'

export const ClassGuestsUpdateOneMutation = mutationField(
  'updateOneClassGuests',
  {
    type: nonNull('ClassGuests'),
    args: {
      where: nonNull('ClassGuestsWhereUniqueInput'),
      data: nonNull('ClassGuestsUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classGuests.update({
        where,
        data,
        ...select,
      })
    },
  },
)
