import { mutationField, nonNull } from 'nexus'

export const CompanyRoomLocationUpsertOneMutation = mutationField(
  'upsertOneCompanyRoomLocation',
  {
    type: nonNull('CompanyRoomLocation'),
    args: {
      where: nonNull('CompanyRoomLocationWhereUniqueInput'),
      create: nonNull('CompanyRoomLocationCreateInput'),
      update: nonNull('CompanyRoomLocationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomLocation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
