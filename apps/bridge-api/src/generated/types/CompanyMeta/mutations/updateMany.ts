import { mutationField, nonNull } from 'nexus'

export const CompanyMetaUpdateManyMutation = mutationField(
  'updateManyCompanyMeta',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyMetaUpdateManyMutationInput'),
      where: 'CompanyMetaWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyMeta.updateMany(args as any)
    },
  },
)
