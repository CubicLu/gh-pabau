import { mutationField, nonNull } from 'nexus'

export const IssuingCompanyUpdateOneMutation = mutationField(
  'updateOneIssuingCompany',
  {
    type: nonNull('IssuingCompany'),
    args: {
      data: nonNull('IssuingCompanyUpdateInput'),
      where: nonNull('IssuingCompanyWhereUniqueInput'),
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
