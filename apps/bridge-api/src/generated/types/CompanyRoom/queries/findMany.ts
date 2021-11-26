import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomFindManyQuery = queryField('findManyCompanyRoom', {
  type: nonNull(list(nonNull('CompanyRoom'))),
  args: {
    where: 'CompanyRoomWhereInput',
    orderBy: list('CompanyRoomOrderByWithRelationInput'),
    cursor: 'CompanyRoomWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyRoomScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyRoom.findMany({
      ...args,
      ...select,
    })
  },
})
