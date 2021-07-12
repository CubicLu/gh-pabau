import { mutationField, nonNull } from 'nexus'

export const CompanyRoomDeleteOneMutation = mutationField(
  'deleteOneCompanyRoom',
  {
    type: 'CompanyRoom',
    args: {
      where: nonNull('CompanyRoomWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyRoom.delete({
        where,
        ...select,
      })
    },
  },
)
