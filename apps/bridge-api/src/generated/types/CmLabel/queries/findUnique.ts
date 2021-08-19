import { queryField, nonNull } from 'nexus'

export const CmLabelFindUniqueQuery = queryField('findUniqueCmLabel', {
  type: 'CmLabel',
  args: {
    where: nonNull('CmLabelWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmLabel.findUnique({
      where,
      ...select,
    })
  },
})
