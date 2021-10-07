import { queryField, nonNull, list } from 'nexus'

export const CmExtraSalonFindManyQuery = queryField('findManyCmExtraSalon', {
  type: nonNull(list(nonNull('CmExtraSalon'))),
  args: {
    where: 'CmExtraSalonWhereInput',
    orderBy: list('CmExtraSalonOrderByWithRelationInput'),
    cursor: 'CmExtraSalonWhereUniqueInput',
    distinct: 'CmExtraSalonScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraSalon.findMany({
      ...args,
      ...select,
    })
  },
})
