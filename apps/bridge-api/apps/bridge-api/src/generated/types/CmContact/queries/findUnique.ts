import { queryField, nonNull } from 'nexus'

export const CmContactFindUniqueQuery = queryField('findUniqueCmContact', {
  type: 'CmContact',
  args: {
    where: nonNull('CmContactWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmContact.findUnique({
      where,
      ...select,
    })
  },
})
