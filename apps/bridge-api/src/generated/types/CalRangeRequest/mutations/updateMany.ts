import { mutationField, nonNull } from 'nexus'

export const CalRangeRequestUpdateManyMutation = mutationField(
  'updateManyCalRangeRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CalRangeRequestUpdateManyMutationInput'),
      where: 'CalRangeRequestWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calRangeRequest.updateMany(args as any)
    },
  },
)
