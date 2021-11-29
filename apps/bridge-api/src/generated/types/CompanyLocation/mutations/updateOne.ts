import { mutationField, nonNull } from 'nexus'

export const CompanyLocationUpdateOneMutation = mutationField(
  'updateOneCompanyLocation',
  {
    type: nonNull('CompanyLocation'),
    args: {
      data: nonNull('CompanyLocationUpdateInput'),
      where: nonNull('CompanyLocationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyLocation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
