import { mutationField, nonNull } from 'nexus'

export const CompanyServiceUpsertOneMutation = mutationField(
  'upsertOneCompanyService',
  {
    type: nonNull('CompanyService'),
    args: {
      where: nonNull('CompanyServiceWhereUniqueInput'),
      create: nonNull('CompanyServiceCreateInput'),
      update: nonNull('CompanyServiceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyService.upsert({
        ...args,
        ...select,
      })
    },
  },
)
