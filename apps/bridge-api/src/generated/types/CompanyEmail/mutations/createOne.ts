import { mutationField, nonNull } from 'nexus'

export const CompanyEmailCreateOneMutation = mutationField(
  'createOneCompanyEmail',
  {
    type: nonNull('CompanyEmail'),
    args: {
      data: nonNull('CompanyEmailCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyEmail.create({
        data,
        ...select,
      })
    },
  },
)
