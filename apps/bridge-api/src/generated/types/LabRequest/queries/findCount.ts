import { queryField, nonNull, list } from 'nexus'

export const LabRequestFindCountQuery = queryField('findManyLabRequestCount', {
  type: nonNull('Int'),
  args: {
    where: 'LabRequestWhereInput',
    orderBy: list('LabRequestOrderByWithRelationInput'),
    cursor: 'LabRequestWhereUniqueInput',
    distinct: 'LabRequestScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.labRequest.count(args as any)
  },
})
