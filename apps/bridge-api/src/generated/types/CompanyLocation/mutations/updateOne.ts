import { mutationField, nonNull } from 'nexus'

export const CompanyLocationUpdateOneMutation = mutationField(
  'updateOneCompanyLocation',
  {
    type: nonNull('CompanyLocation'),
    args: {
      where: nonNull('CompanyLocationWhereUniqueInput'),
      data: nonNull('CompanyLocationUpdateInput'),
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
