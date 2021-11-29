import { queryField, nonNull, list } from 'nexus'

export const BnfDrugFindManyQuery = queryField('findManyBnfDrug', {
  type: nonNull(list(nonNull('BnfDrug'))),
  args: {
    where: 'BnfDrugWhereInput',
    orderBy: list('BnfDrugOrderByWithRelationInput'),
    cursor: 'BnfDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BnfDrugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bnfDrug.findMany({
      ...args,
      ...select,
    })
  },
})
