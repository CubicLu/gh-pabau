import { queryField, nonNull } from 'nexus'

export const JobOpeningFindUniqueQuery = queryField('findUniqueJobOpening', {
  type: 'JobOpening',
  args: {
    where: nonNull('JobOpeningWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.jobOpening.findUnique({
      where,
      ...select,
    })
  },
})
