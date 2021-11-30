import { queryField, nonNull, list } from 'nexus'

export const LabFindCountQuery = queryField('findManyLabCount', {
  type: nonNull('Int'),
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LabScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.lab.count(args as any)
  },
})
