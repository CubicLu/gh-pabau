import { queryField, nonNull } from 'nexus'

export const CmStaffGeneralFindUniqueQuery = queryField(
  'findUniqueCmStaffGeneral',
  {
    type: 'CmStaffGeneral',
    args: {
      where: nonNull('CmStaffGeneralWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmStaffGeneral.findUnique({
        where,
        ...select,
      })
    },
  },
)
