import { mutationField, nonNull } from 'nexus'

export const ActivityUserFilterUpsertOneMutation = mutationField(
  'upsertOneActivityUserFilter',
  {
    type: nonNull('ActivityUserFilter'),
    args: {
      where: nonNull('ActivityUserFilterWhereUniqueInput'),
      create: nonNull('ActivityUserFilterCreateInput'),
      update: nonNull('ActivityUserFilterUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilter.upsert({
        ...args,
        ...select,
      })
    },
  },
)
