import { mutationField, nonNull } from 'nexus'

export const CompanyPositionUpdateOneMutation = mutationField(
  'updateOneCompanyPosition',
  {
    type: nonNull('CompanyPosition'),
    args: {
      where: nonNull('CompanyPositionWhereUniqueInput'),
      data: nonNull('CompanyPositionUpdateInput'),
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
