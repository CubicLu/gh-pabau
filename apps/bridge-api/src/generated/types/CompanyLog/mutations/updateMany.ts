import { mutationField, nonNull } from 'nexus'

export const CompanyLogUpdateManyMutation = mutationField(
  'updateManyCompanyLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyLogWhereInput',
      data: nonNull('CompanyLogUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyLog.updateMany(args as any)
    },
  },
)
