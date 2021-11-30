import { mutationField, nonNull } from 'nexus'

export const CompanyServiceUpdateManyMutation = mutationField(
  'updateManyCompanyService',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyServiceUpdateManyMutationInput'),
      where: 'CompanyServiceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyService.updateMany(args as any)
    },
  },
)
