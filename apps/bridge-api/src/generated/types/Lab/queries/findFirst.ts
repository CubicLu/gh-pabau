import { queryField, list } from 'nexus'

export const LabFindFirstQuery = queryField('findFirstLab', {
  type: 'Lab',
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    distinct: 'LabScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.lab.findFirst({
      ...args,
      ...select,
    })
  },
})
