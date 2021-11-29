import { mutationField, nonNull } from 'nexus'

export const CompanyLogUpdateOneMutation = mutationField(
  'updateOneCompanyLog',
  {
    type: nonNull('CompanyLog'),
    args: {
      data: nonNull('CompanyLogUpdateInput'),
      where: nonNull('CompanyLogWhereUniqueInput'),
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
