import { queryField, nonNull, list } from 'nexus'

export const LabFindManyQuery = queryField('findManyLab', {
  type: nonNull(list(nonNull('Lab'))),
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    distinct: 'LabScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.lab.findMany({
      ...args,
      ...select,
    })
  },
})
