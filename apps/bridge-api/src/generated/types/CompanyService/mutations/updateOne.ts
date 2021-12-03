import { mutationField, nonNull } from 'nexus'

export const CompanyServiceUpdateOneMutation = mutationField(
  'updateOneCompanyService',
  {
    type: nonNull('CompanyService'),
    args: {
      data: nonNull('CompanyServiceUpdateInput'),
      where: nonNull('CompanyServiceWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyService.update({
        where,
        data,
        ...select,
      })
    },
  },
)
