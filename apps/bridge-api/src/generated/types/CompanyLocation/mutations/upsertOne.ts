import { mutationField, nonNull } from 'nexus'

export const CompanyLocationUpsertOneMutation = mutationField(
  'upsertOneCompanyLocation',
  {
    type: nonNull('CompanyLocation'),
    args: {
      where: nonNull('CompanyLocationWhereUniqueInput'),
      create: nonNull('CompanyLocationCreateInput'),
      update: nonNull('CompanyLocationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLocation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
