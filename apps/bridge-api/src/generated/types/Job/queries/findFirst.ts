import { queryField, list } from 'nexus'

export const JobFindFirstQuery = queryField('findFirstJob', {
  type: 'Job',
  args: {
    where: 'JobWhereInput',
    orderBy: list('JobOrderByWithRelationInput'),
    cursor: 'JobWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('JobScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.job.findFirst({
      ...args,
      ...select,
    })
  },
})
