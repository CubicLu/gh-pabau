import { mutationField, nonNull } from 'nexus'

export const CompanyBranchGroupUpdateManyMutation = mutationField(
  'updateManyCompanyBranchGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyBranchGroupUpdateManyMutationInput'),
      where: 'CompanyBranchGroupWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranchGroup.updateMany(args as any)
    },
  },
)
