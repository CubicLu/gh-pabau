import { mutationField, nonNull } from 'nexus'

export const BookitProGeneralUpsertOneMutation = mutationField(
  'upsertOneBookitProGeneral',
  {
    type: nonNull('BookitProGeneral'),
    args: {
      where: nonNull('BookitProGeneralWhereUniqueInput'),
      create: nonNull('BookitProGeneralCreateInput'),
      update: nonNull('BookitProGeneralUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProGeneral.upsert({
        ...args,
        ...select,
      })
    },
  },
)
