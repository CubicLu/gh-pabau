import { mutationField, nonNull } from 'nexus'

export const CompanyServiceUpdateManyMutation = mutationField(
  'updateManyCompanyService',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyServiceWhereInput',
      data: nonNull('CompanyServiceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyService.updateMany(args as any)
    },
  },
)
