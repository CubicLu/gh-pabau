import { mutationField, nonNull } from 'nexus'

export const CompanyRoomLocationCreateOneMutation = mutationField(
  'createOneCompanyRoomLocation',
  {
    type: nonNull('CompanyRoomLocation'),
    args: {
      data: nonNull('CompanyRoomLocationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyRoomLocation.create({
        data,
        ...select,
      })
    },
  },
)
