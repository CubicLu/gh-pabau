import { queryField, nonNull } from 'nexus'

export const CmCaseFindUniqueQuery = queryField('findUniqueCmCase', {
  type: 'CmCase',
  args: {
    where: nonNull('CmCaseWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmCase.findUnique({
      where,
      ...select,
    })
  },
})
