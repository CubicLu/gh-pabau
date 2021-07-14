import { mutationField, nonNull } from 'nexus'

export const CompanyPositionCreateOneMutation = mutationField(
  'createOneCompanyPosition',
  {
    type: nonNull('CompanyPosition'),
    args: {
      data: nonNull('CompanyPositionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyPosition.create({
        data,
        ...select,
      })
    },
  },
)
