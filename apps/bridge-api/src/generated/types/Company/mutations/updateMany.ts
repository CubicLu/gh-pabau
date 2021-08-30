import { mutationField, nonNull } from 'nexus'

export const CompanyUpdateManyMutation = mutationField('updateManyCompany', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CompanyWhereInput',
    data: nonNull('CompanyUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.company.updateMany(args as any)
  },
})
