import { mutationField, nonNull } from 'nexus'

export const CompanyLocationCreateOneMutation = mutationField(
  'createOneCompanyLocation',
  {
    type: nonNull('CompanyLocation'),
    args: {
      data: nonNull('CompanyLocationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyLocation.create({
        data,
        ...select,
      })
    },
  },
)
