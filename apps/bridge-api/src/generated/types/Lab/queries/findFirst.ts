import { queryField, list } from 'nexus'

export const LabFindFirstQuery = queryField('findFirstLab', {
  type: 'Lab',
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('LabScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.lab.findFirst({
      ...args,
      ...select,
    })
  },
})
