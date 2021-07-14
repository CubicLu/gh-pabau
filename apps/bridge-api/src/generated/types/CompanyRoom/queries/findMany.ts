import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomFindManyQuery = queryField('findManyCompanyRoom', {
  type: nonNull(list(nonNull('CompanyRoom'))),
  args: {
    where: 'CompanyRoomWhereInput',
    orderBy: list('CompanyRoomOrderByInput'),
    cursor: 'CompanyRoomWhereUniqueInput',
    distinct: 'CompanyRoomScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyRoom.findMany({
      ...args,
      ...select,
    })
  },
})
