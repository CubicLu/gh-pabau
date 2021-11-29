import { queryField, list } from 'nexus'

export const BnfDrugAggregateQuery = queryField('aggregateBnfDrug', {
  type: 'AggregateBnfDrug',
  args: {
    where: 'BnfDrugWhereInput',
    orderBy: list('BnfDrugOrderByWithRelationInput'),
    cursor: 'BnfDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bnfDrug.aggregate({ ...args, ...select }) as any
  },
})
