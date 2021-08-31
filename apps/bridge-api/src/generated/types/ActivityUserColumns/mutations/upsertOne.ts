import { mutationField, nonNull } from 'nexus'

export const ActivityUserColumnsUpsertOneMutation = mutationField(
  'upsertOneActivityUserColumns',
  {
    type: nonNull('ActivityUserColumns'),
    args: {
      where: nonNull('ActivityUserColumnsWhereUniqueInput'),
      create: nonNull('ActivityUserColumnsCreateInput'),
      update: nonNull('ActivityUserColumnsUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserColumns.upsert({
        ...args,
        ...select,
      })
    },
  },
)
