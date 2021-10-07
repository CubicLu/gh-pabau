import { mutationField, nonNull } from 'nexus'

export const ActivityUserColumnsCreateOneMutation = mutationField(
  'createOneActivityUserColumns',
  {
    type: nonNull('ActivityUserColumns'),
    args: {
      data: nonNull('ActivityUserColumnsCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.activityUserColumns.create({
        data,
        ...select,
      })
    },
  },
)
