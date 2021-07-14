import { mutationField, nonNull } from 'nexus'

export const CompanyBranchGroupCreateOneMutation = mutationField(
  'createOneCompanyBranchGroup',
  {
    type: nonNull('CompanyBranchGroup'),
    args: {
      data: nonNull('CompanyBranchGroupCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyBranchGroup.create({
        data,
        ...select,
      })
    },
  },
)
