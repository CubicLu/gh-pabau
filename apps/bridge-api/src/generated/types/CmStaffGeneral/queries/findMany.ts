import { queryField, nonNull, list } from 'nexus'

export const CmStaffGeneralFindManyQuery = queryField(
  'findManyCmStaffGeneral',
  {
    type: nonNull(list(nonNull('CmStaffGeneral'))),
    args: {
      where: 'CmStaffGeneralWhereInput',
      orderBy: list('CmStaffGeneralOrderByWithRelationInput'),
      cursor: 'CmStaffGeneralWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmStaffGeneralScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmStaffGeneral.findMany({
        ...args,
        ...select,
      })
    },
  },
)
