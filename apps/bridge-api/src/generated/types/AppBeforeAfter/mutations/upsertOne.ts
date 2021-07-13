import { mutationField, nonNull } from 'nexus'

export const AppBeforeAfterUpsertOneMutation = mutationField(
  'upsertOneAppBeforeAfter',
  {
    type: nonNull('AppBeforeAfter'),
    args: {
      where: nonNull('AppBeforeAfterWhereUniqueInput'),
      create: nonNull('AppBeforeAfterCreateInput'),
      update: nonNull('AppBeforeAfterUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appBeforeAfter.upsert({
        ...args,
        ...select,
      })
    },
  },
)
