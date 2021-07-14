import { mutationField, nonNull } from 'nexus'

export const CompanyRoomCreateOneMutation = mutationField(
  'createOneCompanyRoom',
  {
    type: nonNull('CompanyRoom'),
    args: {
      data: nonNull('CompanyRoomCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyRoom.create({
        data,
        ...select,
      })
    },
  },
)
