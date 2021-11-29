import { mutationField, nonNull } from 'nexus'

export const CmAuthorizationUpdateOneMutation = mutationField(
  'updateOneCmAuthorization',
  {
    type: nonNull('CmAuthorization'),
    args: {
      data: nonNull('CmAuthorizationUpdateInput'),
      where: nonNull('CmAuthorizationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmAuthorization.update({
        where,
        data,
        ...select,
      })
    },
  },
)
