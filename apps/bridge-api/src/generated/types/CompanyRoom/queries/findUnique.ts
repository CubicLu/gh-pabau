import { queryField, nonNull } from 'nexus'

export const CompanyRoomFindUniqueQuery = queryField('findUniqueCompanyRoom', {
  type: 'CompanyRoom',
  args: {
    where: nonNull('CompanyRoomWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.companyRoom.findUnique({
      where,
      ...select,
    })
  },
})
