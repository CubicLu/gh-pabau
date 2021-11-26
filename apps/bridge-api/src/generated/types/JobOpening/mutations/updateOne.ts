import { mutationField, nonNull } from 'nexus'

export const JobOpeningUpdateOneMutation = mutationField(
  'updateOneJobOpening',
  {
    type: nonNull('JobOpening'),
    args: {
      data: nonNull('JobOpeningUpdateInput'),
      where: nonNull('JobOpeningWhereUniqueInput'),
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
