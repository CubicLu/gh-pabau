import { mutationField, nonNull } from 'nexus'

export const CmAuthorizationCreateOneMutation = mutationField(
  'createOneCmAuthorization',
  {
    type: nonNull('CmAuthorization'),
    args: {
      data: nonNull('CmAuthorizationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmAuthorization.create({
        data,
        ...select,
      })
    },
  },
)
