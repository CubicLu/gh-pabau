import { mutationField, nonNull } from 'nexus'

export const JobOpeningUpdateManyMutation = mutationField(
  'updateManyJobOpening',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'JobOpeningWhereInput',
      data: nonNull('JobOpeningUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobOpening.updateMany(args as any)
    },
  },
)
