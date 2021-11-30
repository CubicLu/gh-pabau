import { mutationField, nonNull } from 'nexus'

export const CompanyEmailUpdateOneMutation = mutationField(
  'updateOneCompanyEmail',
  {
    type: nonNull('CompanyEmail'),
    args: {
      data: nonNull('CompanyEmailUpdateInput'),
      where: nonNull('CompanyEmailWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyEmail.update({
        where,
        data,
        ...select,
      })
    },
  },
)
