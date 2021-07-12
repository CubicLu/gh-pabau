import { mutationField, nonNull } from 'nexus'

export const CmAuthorizationDeleteOneMutation = mutationField(
  'deleteOneCmAuthorization',
  {
    type: 'CmAuthorization',
    args: {
      where: nonNull('CmAuthorizationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmAuthorization.delete({
        where,
        ...select,
      })
    },
  },
)
