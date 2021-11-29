import { mutationField, nonNull } from 'nexus'

export const CompanyUpdateManyMutation = mutationField('updateManyCompany', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CompanyUpdateManyMutationInput'),
    where: 'CompanyWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.company.updateMany(args as any)
  },
})
