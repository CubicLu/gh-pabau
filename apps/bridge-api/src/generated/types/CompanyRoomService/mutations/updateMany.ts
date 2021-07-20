import { mutationField, nonNull } from 'nexus'

export const CompanyRoomServiceUpdateManyMutation = mutationField(
  'updateManyCompanyRoomService',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyRoomServiceWhereInput',
      data: nonNull('CompanyRoomServiceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoomService.updateMany(args as any)
    },
  },
)
