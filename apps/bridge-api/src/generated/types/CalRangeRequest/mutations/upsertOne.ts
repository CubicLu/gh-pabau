import { mutationField, nonNull } from 'nexus'

export const CalRangeRequestUpsertOneMutation = mutationField(
  'upsertOneCalRangeRequest',
  {
    type: nonNull('CalRangeRequest'),
    args: {
      where: nonNull('CalRangeRequestWhereUniqueInput'),
      create: nonNull('CalRangeRequestCreateInput'),
      update: nonNull('CalRangeRequestUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calRangeRequest.upsert({
        ...args,
        ...select,
      })
    },
  },
)
