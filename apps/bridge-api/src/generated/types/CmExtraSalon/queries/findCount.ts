import { queryField, nonNull, list } from 'nexus'

export const CmExtraSalonFindCountQuery = queryField(
  'findManyCmExtraSalonCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmExtraSalonWhereInput',
      orderBy: list('CmExtraSalonOrderByInput'),
      cursor: 'CmExtraSalonWhereUniqueInput',
      distinct: 'CmExtraSalonScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraSalon.count(args as any)
    },
  },
)
