import { mutationField, nonNull } from 'nexus'

export const CompanyLogUpdateOneMutation = mutationField(
  'updateOneCompanyLog',
  {
    type: nonNull('CompanyLog'),
    args: {
      where: nonNull('CompanyLogWhereUniqueInput'),
      data: nonNull('CompanyLogUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyLog.update({
        where,
        data,
        ...select,
      })
    },
  },
)
