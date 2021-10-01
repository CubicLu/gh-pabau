import { mutationField, nonNull } from 'nexus'

export const ActivityUserFiltersUpdateOneMutation = mutationField(
  'updateOneActivityUserFilters',
  {
    type: nonNull('ActivityUserFilters'),
    args: {
      where: nonNull('ActivityUserFiltersWhereUniqueInput'),
      data: nonNull('ActivityUserFiltersUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.activityUserFilters.update({
        where,
        data,
        ...select,
      })
    },
  },
)
