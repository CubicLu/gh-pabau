import { mutationField, nonNull } from 'nexus'

export const CompanyDetailsUpdateOneMutation = mutationField(
  'updateOneCompanyDetails',
  {
    type: nonNull('CompanyDetails'),
    args: {
      where: nonNull('CompanyDetailsWhereUniqueInput'),
      data: nonNull('CompanyDetailsUpdateInput'),
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
