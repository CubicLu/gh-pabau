import { mutationField, nonNull } from 'nexus'

export const IssuingCompanyUpdateManyMutation = mutationField(
  'updateManyIssuingCompany',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'IssuingCompanyWhereInput',
      data: nonNull('IssuingCompanyUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.issuingCompany.updateMany(args as any)
    },
  },
)
