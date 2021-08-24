import { mutationField, nonNull } from 'nexus'

export const JobOpeningUpsertOneMutation = mutationField(
  'upsertOneJobOpening',
  {
    type: nonNull('JobOpening'),
    args: {
      where: nonNull('JobOpeningWhereUniqueInput'),
      create: nonNull('JobOpeningCreateInput'),
      update: nonNull('JobOpeningUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobOpening.upsert({
        ...args,
        ...select,
      })
    },
  },
)
