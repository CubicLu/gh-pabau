import { queryField, nonNull } from 'nexus'

export const LabFindUniqueQuery = queryField('findUniqueLab', {
  type: 'Lab',
  args: {
    where: nonNull('LabWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.lab.findUnique({
      where,
      ...select,
    })
  },
})
