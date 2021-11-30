import { mutationField, nonNull } from 'nexus'

export const IssuingCompanyUpdateManyMutation = mutationField(
  'updateManyIssuingCompany',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('IssuingCompanyUpdateManyMutationInput'),
      where: 'IssuingCompanyWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.issuingCompany.updateMany(args as any)
    },
  },
)
