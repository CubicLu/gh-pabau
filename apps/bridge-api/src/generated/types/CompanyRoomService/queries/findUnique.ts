import { queryField, nonNull } from 'nexus'

export const CompanyRoomServiceFindUniqueQuery = queryField(
  'findUniqueCompanyRoomService',
  {
    type: 'CompanyRoomService',
    args: {
      where: nonNull('CompanyRoomServiceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyRoomService.findUnique({
        where,
        ...select,
      })
    },
  },
)
