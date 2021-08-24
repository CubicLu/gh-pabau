import { mutationField, nonNull } from 'nexus'

export const JobOpeningDeleteOneMutation = mutationField(
  'deleteOneJobOpening',
  {
    type: 'JobOpening',
    args: {
      where: nonNull('JobOpeningWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.jobOpening.delete({
        where,
        ...select,
      })
    },
  },
)
