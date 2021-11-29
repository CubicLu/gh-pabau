import { queryField, nonNull, list } from 'nexus'

export const CmExtraSalonFindCountQuery = queryField(
  'findManyCmExtraSalonCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmExtraSalonWhereInput',
      orderBy: list('CmExtraSalonOrderByWithRelationInput'),
      cursor: 'CmExtraSalonWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmExtraSalonScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraSalon.count(args as any)
    },
  },
)
