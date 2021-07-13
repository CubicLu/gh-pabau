import { mutationField, nonNull } from 'nexus'

export const CompanyRoomUpdateManyMutation = mutationField(
  'updateManyCompanyRoom',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyRoomWhereInput',
      data: nonNull('CompanyRoomUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoom.updateMany(args as any)
    },
  },
)
