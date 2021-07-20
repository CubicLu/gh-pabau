import { mutationField, nonNull } from 'nexus'

export const CompanyServiceCreateOneMutation = mutationField(
  'createOneCompanyService',
  {
    type: nonNull('CompanyService'),
    args: {
      data: nonNull('CompanyServiceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyService.create({
        data,
        ...select,
      })
    },
  },
)
