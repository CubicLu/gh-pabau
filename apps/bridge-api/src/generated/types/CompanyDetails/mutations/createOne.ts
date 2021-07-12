import { mutationField, nonNull } from 'nexus'

export const CompanyDetailsCreateOneMutation = mutationField(
  'createOneCompanyDetails',
  {
    type: nonNull('CompanyDetails'),
    args: {
      data: nonNull('CompanyDetailsCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyDetails.create({
        data,
        ...select,
      })
    },
  },
)
