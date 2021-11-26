import { queryField, nonNull, list } from 'nexus'

export const CmStaffGeneralFindCountQuery = queryField(
  'findManyCmStaffGeneralCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmStaffGeneralWhereInput',
      orderBy: list('CmStaffGeneralOrderByWithRelationInput'),
      cursor: 'CmStaffGeneralWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmStaffGeneralScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmStaffGeneral.count(args as any)
    },
  },
)
