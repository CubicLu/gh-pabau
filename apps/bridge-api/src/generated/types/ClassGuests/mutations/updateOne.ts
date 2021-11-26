import { mutationField, nonNull } from 'nexus'

export const ClassGuestsUpdateOneMutation = mutationField(
  'updateOneClassGuests',
  {
    type: nonNull('ClassGuests'),
    args: {
      data: nonNull('ClassGuestsUpdateInput'),
      where: nonNull('ClassGuestsWhereUniqueInput'),
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
