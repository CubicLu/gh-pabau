import { mutationField, nonNull } from 'nexus'

export const CompanyRoomLocationUpdateOneMutation = mutationField(
  'updateOneCompanyRoomLocation',
  {
    type: nonNull('CompanyRoomLocation'),
    args: {
      data: nonNull('CompanyRoomLocationUpdateInput'),
      where: nonNull('CompanyRoomLocationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyRoomLocation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
