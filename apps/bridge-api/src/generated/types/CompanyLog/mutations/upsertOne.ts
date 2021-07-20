import { mutationField, nonNull } from 'nexus'

export const CompanyLogUpsertOneMutation = mutationField(
  'upsertOneCompanyLog',
  {
    type: nonNull('CompanyLog'),
    args: {
      where: nonNull('CompanyLogWhereUniqueInput'),
      create: nonNull('CompanyLogCreateInput'),
      update: nonNull('CompanyLogUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLog.upsert({
        ...args,
        ...select,
      })
    },
  },
)
