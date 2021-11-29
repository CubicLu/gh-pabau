import { mutationField, nonNull } from 'nexus'

export const CompanyRoomServiceUpdateManyMutation = mutationField(
  'updateManyCompanyRoomService',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyRoomServiceUpdateManyMutationInput'),
      where: 'CompanyRoomServiceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoomService.updateMany(args as any)
    },
  },
)
