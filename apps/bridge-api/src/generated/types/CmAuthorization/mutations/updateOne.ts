import { mutationField, nonNull } from 'nexus'

export const CmAuthorizationUpdateOneMutation = mutationField(
  'updateOneCmAuthorization',
  {
    type: nonNull('CmAuthorization'),
    args: {
      where: nonNull('CmAuthorizationWhereUniqueInput'),
      data: nonNull('CmAuthorizationUpdateInput'),
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
