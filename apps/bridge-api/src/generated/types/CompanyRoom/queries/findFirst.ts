import { queryField, list } from 'nexus'

export const CompanyRoomFindFirstQuery = queryField('findFirstCompanyRoom', {
  type: 'CompanyRoom',
  args: {
    where: 'CompanyRoomWhereInput',
    orderBy: list('CompanyRoomOrderByWithRelationInput'),
    cursor: 'CompanyRoomWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyRoomScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyRoom.findFirst({
      ...args,
      ...select,
    })
  },
})
