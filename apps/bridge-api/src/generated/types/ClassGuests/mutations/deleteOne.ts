import { mutationField, nonNull } from 'nexus'

export const ClassGuestsDeleteOneMutation = mutationField(
  'deleteOneClassGuests',
  {
    type: 'ClassGuests',
    args: {
      where: nonNull('ClassGuestsWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classGuests.delete({
        where,
        ...select,
      })
    },
  },
)
