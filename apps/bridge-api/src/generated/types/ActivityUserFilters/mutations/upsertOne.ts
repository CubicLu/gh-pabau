import { mutationField, nonNull } from 'nexus'

export const ActivityUserFiltersUpsertOneMutation = mutationField(
  'upsertOneActivityUserFilters',
  {
    type: nonNull('ActivityUserFilters'),
    args: {
      where: nonNull('ActivityUserFiltersWhereUniqueInput'),
      create: nonNull('ActivityUserFiltersCreateInput'),
      update: nonNull('ActivityUserFiltersUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilters.upsert({
        ...args,
        ...select,
      })
    },
  },
)
