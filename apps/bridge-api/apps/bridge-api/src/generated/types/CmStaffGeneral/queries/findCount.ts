import { queryField, nonNull, list } from 'nexus'

export const CmStaffGeneralFindCountQuery = queryField(
  'findManyCmStaffGeneralCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmStaffGeneralWhereInput',
      orderBy: list('CmStaffGeneralOrderByWithRelationInput'),
      cursor: 'CmStaffGeneralWhereUniqueInput',
      distinct: 'CmStaffGeneralScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmStaffGeneral.count(args as any)
    },
  },
)
