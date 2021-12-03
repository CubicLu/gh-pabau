import { mutationField, nonNull } from 'nexus'

export const CompanyVariableUpdateManyMutation = mutationField(
  'updateManyCompanyVariable',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyVariableUpdateManyMutationInput'),
      where: 'CompanyVariableWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyVariable.updateMany(args as any)
    },
  },
)
