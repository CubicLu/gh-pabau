import { mutationField, nonNull } from 'nexus'

export const CompanyRoomUpsertOneMutation = mutationField(
  'upsertOneCompanyRoom',
  {
    type: nonNull('CompanyRoom'),
    args: {
      where: nonNull('CompanyRoomWhereUniqueInput'),
      create: nonNull('CompanyRoomCreateInput'),
      update: nonNull('CompanyRoomUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoom.upsert({
        ...args,
        ...select,
      })
    },
  },
)
