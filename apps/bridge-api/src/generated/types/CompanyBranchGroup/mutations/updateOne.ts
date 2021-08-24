import { mutationField, nonNull } from 'nexus'

export const CompanyBranchGroupUpdateOneMutation = mutationField(
  'updateOneCompanyBranchGroup',
  {
    type: nonNull('CompanyBranchGroup'),
    args: {
      where: nonNull('CompanyBranchGroupWhereUniqueInput'),
      data: nonNull('CompanyBranchGroupUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyBranchGroup.update({
        where,
        data,
        ...select,
      })
    },
  },
)
