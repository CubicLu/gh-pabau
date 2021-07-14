import { mutationField, nonNull } from 'nexus'

export const CompanyRoomServiceDeleteOneMutation = mutationField(
  'deleteOneCompanyRoomService',
  {
    type: 'CompanyRoomService',
    args: {
      where: nonNull('CompanyRoomServiceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyRoomService.delete({
        where,
        ...select,
      })
    },
  },
)
