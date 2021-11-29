import { mutationField, nonNull } from 'nexus'

export const CompanyPositionUpdateOneMutation = mutationField(
  'updateOneCompanyPosition',
  {
    type: nonNull('CompanyPosition'),
    args: {
      data: nonNull('CompanyPositionUpdateInput'),
      where: nonNull('CompanyPositionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyPosition.update({
        where,
        data,
        ...select,
      })
    },
  },
)
