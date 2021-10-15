import { queryField, nonNull, list } from 'nexus'

export const BnfDrugFindManyQuery = queryField('findManyBnfDrug', {
  type: nonNull(list(nonNull('BnfDrug'))),
  args: {
    where: 'BnfDrugWhereInput',
    orderBy: list('BnfDrugOrderByInput'),
    cursor: 'BnfDrugWhereUniqueInput',
    distinct: 'BnfDrugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bnfDrug.findMany({
      ...args,
      ...select,
    })
  },
})
