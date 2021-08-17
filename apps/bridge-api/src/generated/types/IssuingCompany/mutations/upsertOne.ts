import { mutationField, nonNull } from 'nexus'

export const IssuingCompanyUpsertOneMutation = mutationField(
  'upsertOneIssuingCompany',
  {
    type: nonNull('IssuingCompany'),
    args: {
      where: nonNull('IssuingCompanyWhereUniqueInput'),
      create: nonNull('IssuingCompanyCreateInput'),
      update: nonNull('IssuingCompanyUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.issuingCompany.upsert({
        ...args,
        ...select,
      })
    },
  },
)
