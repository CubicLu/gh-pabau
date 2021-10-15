import { queryField, nonNull, list } from 'nexus'

export const CmStaffGeneralFindManyQuery = queryField(
  'findManyCmStaffGeneral',
  {
    type: nonNull(list(nonNull('CmStaffGeneral'))),
    args: {
      where: 'CmStaffGeneralWhereInput',
      orderBy: list('CmStaffGeneralOrderByInput'),
      cursor: 'CmStaffGeneralWhereUniqueInput',
      distinct: 'CmStaffGeneralScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmStaffGeneral.findMany({
        ...args,
        ...select,
      })
    },
  },
)
