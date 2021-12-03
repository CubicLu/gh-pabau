import { queryField, nonNull, list } from 'nexus'

export const BnfDrugFindCountQuery = queryField('findManyBnfDrugCount', {
  type: nonNull('Int'),
  args: {
    where: 'BnfDrugWhereInput',
    orderBy: list('BnfDrugOrderByWithRelationInput'),
    cursor: 'BnfDrugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BnfDrugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.bnfDrug.count(args as any)
  },
})
