import { queryField, list } from 'nexus'

export const CompanyRoomFindFirstQuery = queryField('findFirstCompanyRoom', {
  type: 'CompanyRoom',
  args: {
    where: 'CompanyRoomWhereInput',
    orderBy: list('CompanyRoomOrderByWithRelationInput'),
    cursor: 'CompanyRoomWhereUniqueInput',
    distinct: 'CompanyRoomScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyRoom.findFirst({
      ...args,
      ...select,
    })
  },
})
