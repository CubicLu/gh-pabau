import { queryField, nonNull, list } from 'nexus'

export const BnfDrugFindCountQuery = queryField('findManyBnfDrugCount', {
  type: nonNull('Int'),
  args: {
    where: 'BnfDrugWhereInput',
    orderBy: list('BnfDrugOrderByInput'),
    cursor: 'BnfDrugWhereUniqueInput',
    distinct: 'BnfDrugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.bnfDrug.count(args as any)
  },
})
