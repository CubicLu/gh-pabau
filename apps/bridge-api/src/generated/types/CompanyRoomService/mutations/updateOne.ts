import { mutationField, nonNull } from 'nexus'

export const CompanyRoomServiceUpdateOneMutation = mutationField(
  'updateOneCompanyRoomService',
  {
    type: nonNull('CompanyRoomService'),
    args: {
      data: nonNull('CompanyRoomServiceUpdateInput'),
      where: nonNull('CompanyRoomServiceWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyRoomService.update({
        where,
        data,
        ...select,
      })
    },
  },
)
