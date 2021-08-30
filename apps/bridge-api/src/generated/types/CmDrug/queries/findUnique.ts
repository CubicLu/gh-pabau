import { queryField, nonNull } from 'nexus'

export const CmDrugFindUniqueQuery = queryField('findUniqueCmDrug', {
  type: 'CmDrug',
  args: {
    where: nonNull('CmDrugWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmDrug.findUnique({
      where,
      ...select,
    })
  },
})
