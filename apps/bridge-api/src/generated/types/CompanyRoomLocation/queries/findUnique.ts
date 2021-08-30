import { queryField, nonNull } from 'nexus'

export const CompanyRoomLocationFindUniqueQuery = queryField(
  'findUniqueCompanyRoomLocation',
  {
    type: 'CompanyRoomLocation',
    args: {
      where: nonNull('CompanyRoomLocationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyRoomLocation.findUnique({
        where,
        ...select,
      })
    },
  },
)
