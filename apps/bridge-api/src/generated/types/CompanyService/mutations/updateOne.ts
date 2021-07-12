import { mutationField, nonNull } from 'nexus'

export const CompanyServiceUpdateOneMutation = mutationField(
  'updateOneCompanyService',
  {
    type: nonNull('CompanyService'),
    args: {
      where: nonNull('CompanyServiceWhereUniqueInput'),
      data: nonNull('CompanyServiceUpdateInput'),
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
