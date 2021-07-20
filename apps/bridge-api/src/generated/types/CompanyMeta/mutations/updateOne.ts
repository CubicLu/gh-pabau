import { mutationField, nonNull } from 'nexus'

export const CompanyMetaUpdateOneMutation = mutationField(
  'updateOneCompanyMeta',
  {
    type: nonNull('CompanyMeta'),
    args: {
      where: nonNull('CompanyMetaWhereUniqueInput'),
      data: nonNull('CompanyMetaUpdateInput'),
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
