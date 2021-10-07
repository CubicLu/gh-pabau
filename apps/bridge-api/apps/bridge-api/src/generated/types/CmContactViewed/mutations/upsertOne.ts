import { mutationField, nonNull } from 'nexus'

export const CmContactViewedUpsertOneMutation = mutationField(
  'upsertOneCmContactViewed',
  {
    type: nonNull('CmContactViewed'),
    args: {
      where: nonNull('CmContactViewedWhereUniqueInput'),
      create: nonNull('CmContactViewedCreateInput'),
      update: nonNull('CmContactViewedUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactViewed.upsert({
        ...args,
        ...select,
      })
    },
  },
)
