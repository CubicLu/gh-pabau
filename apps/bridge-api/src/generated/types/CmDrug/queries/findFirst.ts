import { queryField, list } from 'nexus'

export const CmDrugFindFirstQuery = queryField('findFirstCmDrug', {
  type: 'CmDrug',
  args: {
    where: 'CmDrugWhereInput',
    orderBy: list('CmDrugOrderByWithRelationInput'),
    cursor: 'CmDrugWhereUniqueInput',
    distinct: 'CmDrugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmDrug.findFirst({
      ...args,
      ...select,
    })
  },
})
