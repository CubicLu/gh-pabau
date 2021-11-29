import { queryField, nonNull, list } from 'nexus'

export const CmDrugFindManyQuery = queryField('findManyCmDrug', {
  type: nonNull(list(nonNull('CmDrug'))),
  args: {
    where: 'CmDrugWhereInput',
    orderBy: list('CmDrugOrderByWithRelationInput'),
    cursor: 'CmDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmDrugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmDrug.findMany({
      ...args,
      ...select,
    })
  },
})
