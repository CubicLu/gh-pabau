import { queryField, list } from 'nexus'

export const CmStaffGeneralFindFirstQuery = queryField(
  'findFirstCmStaffGeneral',
  {
    type: 'CmStaffGeneral',
    args: {
      where: 'CmStaffGeneralWhereInput',
      orderBy: list('CmStaffGeneralOrderByWithRelationInput'),
      cursor: 'CmStaffGeneralWhereUniqueInput',
      distinct: 'CmStaffGeneralScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmStaffGeneral.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
