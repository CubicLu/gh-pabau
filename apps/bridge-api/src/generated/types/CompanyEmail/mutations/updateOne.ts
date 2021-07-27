import { mutationField, nonNull } from 'nexus'

export const CompanyEmailUpdateOneMutation = mutationField(
  'updateOneCompanyEmail',
  {
    type: nonNull('CompanyEmail'),
    args: {
      where: nonNull('CompanyEmailWhereUniqueInput'),
      data: nonNull('CompanyEmailUpdateInput'),
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
