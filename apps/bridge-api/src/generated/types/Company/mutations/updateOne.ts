import { mutationField, nonNull } from 'nexus'

export const CompanyUpdateOneMutation = mutationField('updateOneCompany', {
  type: nonNull('Company'),
  args: {
    where: nonNull('CompanyWhereUniqueInput'),
    data: nonNull('CompanyUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.company.update({
      where,
      data,
      ...select,
    })
  },
})
