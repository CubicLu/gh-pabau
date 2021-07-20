import { mutationField, nonNull } from 'nexus'

export const CmContactViewedUpdateOneMutation = mutationField(
  'updateOneCmContactViewed',
  {
    type: nonNull('CmContactViewed'),
    args: {
      where: nonNull('CmContactViewedWhereUniqueInput'),
      data: nonNull('CmContactViewedUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactViewed.update({
        where,
        data,
        ...select,
      })
    },
  },
)
