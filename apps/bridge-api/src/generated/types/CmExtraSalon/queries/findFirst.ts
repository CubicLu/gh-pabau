import { queryField, list } from 'nexus'

export const CmExtraSalonFindFirstQuery = queryField('findFirstCmExtraSalon', {
  type: 'CmExtraSalon',
  args: {
    where: 'CmExtraSalonWhereInput',
    orderBy: list('CmExtraSalonOrderByWithRelationInput'),
    cursor: 'CmExtraSalonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmExtraSalonScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraSalon.findFirst({
      ...args,
      ...select,
    })
  },
})
