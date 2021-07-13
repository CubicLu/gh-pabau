import { mutationField, nonNull } from 'nexus'

export const CompanyRoomLocationDeleteOneMutation = mutationField(
  'deleteOneCompanyRoomLocation',
  {
    type: 'CompanyRoomLocation',
    args: {
      where: nonNull('CompanyRoomLocationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyRoomLocation.delete({
        where,
        ...select,
      })
    },
  },
)
