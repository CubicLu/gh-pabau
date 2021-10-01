import { mutationField, nonNull } from 'nexus'

export const ActivityUserFiltersCreateOneMutation = mutationField(
  'createOneActivityUserFilters',
  {
    type: nonNull('ActivityUserFilters'),
    args: {
      data: nonNull('ActivityUserFiltersCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.activityUserFilters.create({
        data,
        ...select,
      })
    },
  },
)
