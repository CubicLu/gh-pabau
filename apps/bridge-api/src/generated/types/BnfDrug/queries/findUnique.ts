import { queryField, nonNull } from 'nexus'

export const BnfDrugFindUniqueQuery = queryField('findUniqueBnfDrug', {
  type: 'BnfDrug',
  args: {
    where: nonNull('BnfDrugWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.bnfDrug.findUnique({
      where,
      ...select,
    })
  },
})
