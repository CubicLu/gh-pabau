import { mutationField, nonNull } from 'nexus'

export const CompanyUpdateOneMutation = mutationField('updateOneCompany', {
  type: nonNull('Company'),
  args: {
    data: nonNull('CompanyUpdateInput'),
    where: nonNull('CompanyWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.company.update({
      where,
      data,
      ...select,
    })
  },
})
