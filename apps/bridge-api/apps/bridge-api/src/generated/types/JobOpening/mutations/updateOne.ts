import { mutationField, nonNull } from 'nexus'

export const JobOpeningUpdateOneMutation = mutationField(
  'updateOneJobOpening',
  {
    type: nonNull('JobOpening'),
    args: {
      where: nonNull('JobOpeningWhereUniqueInput'),
      data: nonNull('JobOpeningUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.jobOpening.update({
        where,
        data,
        ...select,
      })
    },
  },
)
