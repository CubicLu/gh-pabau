import { queryField, list } from 'nexus'

export const BnfDrugFindFirstQuery = queryField('findFirstBnfDrug', {
  type: 'BnfDrug',
  args: {
    where: 'BnfDrugWhereInput',
    orderBy: list('BnfDrugOrderByWithRelationInput'),
    cursor: 'BnfDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BnfDrugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bnfDrug.findFirst({
      ...args,
      ...select,
    })
  },
})
