import { queryField, list } from 'nexus'

export const CmDrugAggregateQuery = queryField('aggregateCmDrug', {
  type: 'AggregateCmDrug',
  args: {
    where: 'CmDrugWhereInput',
    orderBy: list('CmDrugOrderByWithRelationInput'),
    cursor: 'CmDrugWhereUniqueInput',
    distinct: 'CmDrugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmDrug.aggregate({ ...args, ...select }) as any
  },
})
