import { mutationField, nonNull } from 'nexus'

export const CompanyRoomUpdateOneMutation = mutationField(
  'updateOneCompanyRoom',
  {
    type: nonNull('CompanyRoom'),
    args: {
      where: nonNull('CompanyRoomWhereUniqueInput'),
      data: nonNull('CompanyRoomUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyRoom.update({
        where,
        data,
        ...select,
      })
    },
  },
)
