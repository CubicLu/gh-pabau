import { mutationField, nonNull } from 'nexus'

export const CompanyVariableUpdateManyMutation = mutationField(
  'updateManyCompanyVariable',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyVariableWhereInput',
      data: nonNull('CompanyVariableUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyVariable.updateMany(args as any)
    },
  },
)
