import { mutationField, nonNull } from 'nexus'

export const CompanyRoomUpdateOneMutation = mutationField(
  'updateOneCompanyRoom',
  {
    type: nonNull('CompanyRoom'),
    args: {
      data: nonNull('CompanyRoomUpdateInput'),
      where: nonNull('CompanyRoomWhereUniqueInput'),
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
