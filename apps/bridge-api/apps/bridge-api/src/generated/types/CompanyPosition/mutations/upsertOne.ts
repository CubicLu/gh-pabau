import { mutationField, nonNull } from 'nexus'

export const CompanyPositionUpsertOneMutation = mutationField(
  'upsertOneCompanyPosition',
  {
    type: nonNull('CompanyPosition'),
    args: {
      where: nonNull('CompanyPositionWhereUniqueInput'),
      create: nonNull('CompanyPositionCreateInput'),
      update: nonNull('CompanyPositionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPosition.upsert({
        ...args,
        ...select,
      })
    },
  },
)
