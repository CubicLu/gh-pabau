import { mutationField, nonNull } from 'nexus'

export const CompanyMetaUpdateOneMutation = mutationField(
  'updateOneCompanyMeta',
  {
    type: nonNull('CompanyMeta'),
    args: {
      data: nonNull('CompanyMetaUpdateInput'),
      where: nonNull('CompanyMetaWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyMeta.update({
        where,
        data,
        ...select,
      })
    },
  },
)
