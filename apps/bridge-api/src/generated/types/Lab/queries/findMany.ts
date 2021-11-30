import { queryField, nonNull, list } from 'nexus'

export const LabFindManyQuery = queryField('findManyLab', {
  type: nonNull(list(nonNull('Lab'))),
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LabScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.lab.findMany({
      ...args,
      ...select,
    })
  },
})
