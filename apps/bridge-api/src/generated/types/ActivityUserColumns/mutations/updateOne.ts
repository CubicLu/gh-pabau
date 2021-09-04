import { mutationField, nonNull } from 'nexus'

export const ActivityUserColumnsUpdateOneMutation = mutationField(
  'updateOneActivityUserColumns',
  {
    type: nonNull('ActivityUserColumns'),
    args: {
      where: nonNull('ActivityUserColumnsWhereUniqueInput'),
      data: nonNull('ActivityUserColumnsUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.activityUserColumns.update({
        where,
        data,
        ...select,
      })
    },
  },
)
