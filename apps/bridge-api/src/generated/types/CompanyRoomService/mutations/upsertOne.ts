import { mutationField, nonNull } from 'nexus'

export const CompanyRoomServiceUpsertOneMutation = mutationField(
  'upsertOneCompanyRoomService',
  {
    type: nonNull('CompanyRoomService'),
    args: {
      where: nonNull('CompanyRoomServiceWhereUniqueInput'),
      create: nonNull('CompanyRoomServiceCreateInput'),
      update: nonNull('CompanyRoomServiceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomService.upsert({
        ...args,
        ...select,
      })
    },
  },
)
