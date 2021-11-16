import { queryField, nonNull, list } from 'nexus'

export const LabFindCountQuery = queryField('findManyLabCount', {
  type: nonNull('Int'),
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    distinct: 'LabScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.lab.count(args as any)
  },
})
