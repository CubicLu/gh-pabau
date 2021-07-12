import { mutationField, nonNull } from 'nexus'

export const CompanyMetaUpdateManyMutation = mutationField(
  'updateManyCompanyMeta',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyMetaWhereInput',
      data: nonNull('CompanyMetaUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyMeta.updateMany(args as any)
    },
  },
)
