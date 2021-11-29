import { queryField, list } from 'nexus'

export const CmDrugFindFirstQuery = queryField('findFirstCmDrug', {
  type: 'CmDrug',
  args: {
    where: 'CmDrugWhereInput',
    orderBy: list('CmDrugOrderByWithRelationInput'),
    cursor: 'CmDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmDrugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmDrug.findFirst({
      ...args,
      ...select,
    })
  },
})
