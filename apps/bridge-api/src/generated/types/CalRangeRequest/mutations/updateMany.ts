import { mutationField, nonNull } from 'nexus'

export const CalRangeRequestUpdateManyMutation = mutationField(
  'updateManyCalRangeRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CalRangeRequestWhereInput',
      data: nonNull('CalRangeRequestUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calRangeRequest.updateMany(args as any)
    },
  },
)
