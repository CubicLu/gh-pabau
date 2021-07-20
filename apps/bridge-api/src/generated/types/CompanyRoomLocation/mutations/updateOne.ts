import { mutationField, nonNull } from 'nexus'

export const CompanyRoomLocationUpdateOneMutation = mutationField(
  'updateOneCompanyRoomLocation',
  {
    type: nonNull('CompanyRoomLocation'),
    args: {
      where: nonNull('CompanyRoomLocationWhereUniqueInput'),
      data: nonNull('CompanyRoomLocationUpdateInput'),
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
