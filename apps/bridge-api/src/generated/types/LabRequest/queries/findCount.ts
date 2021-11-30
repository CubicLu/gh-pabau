import { queryField, nonNull, list } from 'nexus'

export const LabRequestFindCountQuery = queryField('findManyLabRequestCount', {
  type: nonNull('Int'),
  args: {
    where: 'LabRequestWhereInput',
    orderBy: list('LabRequestOrderByWithRelationInput'),
    cursor: 'LabRequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LabRequestScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.labRequest.count(args as any)
  },
})
