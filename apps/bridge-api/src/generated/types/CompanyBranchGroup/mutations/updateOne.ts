import { mutationField, nonNull } from 'nexus'

export const CompanyBranchGroupUpdateOneMutation = mutationField(
  'updateOneCompanyBranchGroup',
  {
    type: nonNull('CompanyBranchGroup'),
    args: {
      data: nonNull('CompanyBranchGroupUpdateInput'),
      where: nonNull('CompanyBranchGroupWhereUniqueInput'),
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
