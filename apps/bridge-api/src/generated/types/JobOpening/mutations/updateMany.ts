import { mutationField, nonNull } from 'nexus'

export const JobOpeningUpdateManyMutation = mutationField(
  'updateManyJobOpening',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('JobOpeningUpdateManyMutationInput'),
      where: 'JobOpeningWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobOpening.updateMany(args as any)
    },
  },
)
