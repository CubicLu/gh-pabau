import { mutationField, nonNull } from 'nexus'

export const CompanyBranchGroupUpdateManyMutation = mutationField(
  'updateManyCompanyBranchGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyBranchGroupWhereInput',
      data: nonNull('CompanyBranchGroupUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranchGroup.updateMany(args as any)
    },
  },
)
