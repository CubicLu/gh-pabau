import { mutationField, nonNull } from 'nexus'

export const CmAuthorizationUpsertOneMutation = mutationField(
  'upsertOneCmAuthorization',
  {
    type: nonNull('CmAuthorization'),
    args: {
      where: nonNull('CmAuthorizationWhereUniqueInput'),
      create: nonNull('CmAuthorizationCreateInput'),
      update: nonNull('CmAuthorizationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAuthorization.upsert({
        ...args,
        ...select,
      })
    },
  },
)
