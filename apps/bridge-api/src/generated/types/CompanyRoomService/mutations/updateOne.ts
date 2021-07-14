import { mutationField, nonNull } from 'nexus'

export const CompanyRoomServiceUpdateOneMutation = mutationField(
  'updateOneCompanyRoomService',
  {
    type: nonNull('CompanyRoomService'),
    args: {
      where: nonNull('CompanyRoomServiceWhereUniqueInput'),
      data: nonNull('CompanyRoomServiceUpdateInput'),
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
