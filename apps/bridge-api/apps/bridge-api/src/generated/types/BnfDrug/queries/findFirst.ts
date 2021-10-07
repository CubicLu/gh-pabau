import { queryField, list } from 'nexus'

export const BnfDrugFindFirstQuery = queryField('findFirstBnfDrug', {
  type: 'BnfDrug',
  args: {
    where: 'BnfDrugWhereInput',
    orderBy: list('BnfDrugOrderByWithRelationInput'),
    cursor: 'BnfDrugWhereUniqueInput',
    distinct: 'BnfDrugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bnfDrug.findFirst({
      ...args,
      ...select,
    })
  },
})
