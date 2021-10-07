import { queryField, nonNull, list } from 'nexus'

export const JobFindManyQuery = queryField('findManyJob', {
  type: nonNull(list(nonNull('Job'))),
  args: {
    where: 'JobWhereInput',
    orderBy: list('JobOrderByWithRelationInput'),
    cursor: 'JobWhereUniqueInput',
    distinct: 'JobScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.job.findMany({
      ...args,
      ...select,
    })
  },
})
