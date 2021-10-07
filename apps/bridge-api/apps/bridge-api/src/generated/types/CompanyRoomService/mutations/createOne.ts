import { mutationField, nonNull } from 'nexus'

export const CompanyRoomServiceCreateOneMutation = mutationField(
  'createOneCompanyRoomService',
  {
    type: nonNull('CompanyRoomService'),
    args: {
      data: nonNull('CompanyRoomServiceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyRoomService.create({
        data,
        ...select,
      })
    },
  },
)
