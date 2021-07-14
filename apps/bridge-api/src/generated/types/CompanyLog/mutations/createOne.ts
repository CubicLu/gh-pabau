import { mutationField, nonNull } from 'nexus'

export const CompanyLogCreateOneMutation = mutationField(
  'createOneCompanyLog',
  {
    type: nonNull('CompanyLog'),
    args: {
      data: nonNull('CompanyLogCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyLog.create({
        data,
        ...select,
      })
    },
  },
)
