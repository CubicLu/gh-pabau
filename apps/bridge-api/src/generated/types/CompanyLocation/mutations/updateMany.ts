import { mutationField, nonNull } from 'nexus'

export const CompanyLocationUpdateManyMutation = mutationField(
  'updateManyCompanyLocation',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyLocationUpdateManyMutationInput'),
      where: 'CompanyLocationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyLocation.updateMany(args as any)
    },
  },
)
