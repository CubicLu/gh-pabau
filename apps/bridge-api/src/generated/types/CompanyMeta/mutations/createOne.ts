import { mutationField, nonNull } from 'nexus'

export const CompanyMetaCreateOneMutation = mutationField(
  'createOneCompanyMeta',
  {
    type: nonNull('CompanyMeta'),
    args: {
      data: nonNull('CompanyMetaCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyMeta.create({
        data,
        ...select,
      })
    },
  },
)
