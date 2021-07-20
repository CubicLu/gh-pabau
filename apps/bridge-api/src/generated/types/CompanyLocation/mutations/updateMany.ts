import { mutationField, nonNull } from 'nexus'

export const CompanyLocationUpdateManyMutation = mutationField(
  'updateManyCompanyLocation',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyLocationWhereInput',
      data: nonNull('CompanyLocationUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyLocation.updateMany(args as any)
    },
  },
)
