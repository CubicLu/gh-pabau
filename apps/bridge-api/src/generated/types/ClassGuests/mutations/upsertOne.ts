import { mutationField, nonNull } from 'nexus'

export const ClassGuestsUpsertOneMutation = mutationField(
  'upsertOneClassGuests',
  {
    type: nonNull('ClassGuests'),
    args: {
      where: nonNull('ClassGuestsWhereUniqueInput'),
      create: nonNull('ClassGuestsCreateInput'),
      update: nonNull('ClassGuestsUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classGuests.upsert({
        ...args,
        ...select,
      })
    },
  },
)
