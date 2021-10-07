import { mutationField, nonNull } from 'nexus'

export const IssuingCompanyUpdateOneMutation = mutationField(
  'updateOneIssuingCompany',
  {
    type: nonNull('IssuingCompany'),
    args: {
      where: nonNull('IssuingCompanyWhereUniqueInput'),
      data: nonNull('IssuingCompanyUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.issuingCompany.update({
        where,
        data,
        ...select,
      })
    },
  },
)
