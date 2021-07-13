import { mutationField, nonNull } from 'nexus'

export const CompanyDetailsUpsertOneMutation = mutationField(
  'upsertOneCompanyDetails',
  {
    type: nonNull('CompanyDetails'),
    args: {
      where: nonNull('CompanyDetailsWhereUniqueInput'),
      create: nonNull('CompanyDetailsCreateInput'),
      update: nonNull('CompanyDetailsUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDetails.upsert({
        ...args,
        ...select,
      })
    },
  },
)
