import { queryField, nonNull, list } from 'nexus'

export const CmDrugFindCountQuery = queryField('findManyCmDrugCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmDrugWhereInput',
    orderBy: list('CmDrugOrderByInput'),
    cursor: 'CmDrugWhereUniqueInput',
    distinct: 'CmDrugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmDrug.count(args as any)
  },
})
