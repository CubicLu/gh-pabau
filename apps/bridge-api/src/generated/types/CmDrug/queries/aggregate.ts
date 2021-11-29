import { queryField, list } from 'nexus'

export const CmDrugAggregateQuery = queryField('aggregateCmDrug', {
  type: 'AggregateCmDrug',
  args: {
    where: 'CmDrugWhereInput',
    orderBy: list('CmDrugOrderByWithRelationInput'),
    cursor: 'CmDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmDrug.aggregate({ ...args, ...select }) as any
  },
})
