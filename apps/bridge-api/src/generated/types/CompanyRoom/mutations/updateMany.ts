import { mutationField, nonNull } from 'nexus'

export const CompanyRoomUpdateManyMutation = mutationField(
  'updateManyCompanyRoom',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyRoomUpdateManyMutationInput'),
      where: 'CompanyRoomWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoom.updateMany(args as any)
    },
  },
)
