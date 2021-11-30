import { mutationField, nonNull } from 'nexus'

export const CompanyLogUpdateManyMutation = mutationField(
  'updateManyCompanyLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyLogUpdateManyMutationInput'),
      where: 'CompanyLogWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyLog.updateMany(args as any)
    },
  },
)
