import { mutationField, nonNull } from 'nexus'

export const InvCategoryUpsertOneMutation = mutationField(
  'upsertOneInvCategory',
  {
    type: nonNull('InvCategory'),
    args: {
      where: nonNull('InvCategoryWhereUniqueInput'),
      create: nonNull('InvCategoryCreateInput'),
      update: nonNull('InvCategoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invCategory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
