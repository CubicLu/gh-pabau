import { mutationField, nonNull } from 'nexus'

export const JobOpeningCreateOneMutation = mutationField(
  'createOneJobOpening',
  {
    type: nonNull('JobOpening'),
    args: {
      data: nonNull('JobOpeningCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.jobOpening.create({
        data,
        ...select,
      })
    },
  },
)
