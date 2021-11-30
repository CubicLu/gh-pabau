import { queryField, nonNull, list } from 'nexus'

export const CmDrugFindCountQuery = queryField('findManyCmDrugCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmDrugWhereInput',
    orderBy: list('CmDrugOrderByWithRelationInput'),
    cursor: 'CmDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmDrugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmDrug.count(args as any)
  },
})
