import { queryField, nonNull } from 'nexus'

export const IssuingCompanyFindUniqueQuery = queryField(
  'findUniqueIssuingCompany',
  {
    type: 'IssuingCompany',
    args: {
      where: nonNull('IssuingCompanyWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.issuingCompany.findUnique({
        where,
        ...select,
      })
    },
  },
)
