import { mutationField, nonNull } from 'nexus'

export const CompanyDetailsUpdateOneMutation = mutationField(
  'updateOneCompanyDetails',
  {
    type: nonNull('CompanyDetails'),
    args: {
      data: nonNull('CompanyDetailsUpdateInput'),
      where: nonNull('CompanyDetailsWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyDetails.update({
        where,
        data,
        ...select,
      })
    },
  },
)
