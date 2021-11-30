import { mutationField, nonNull } from 'nexus'

export const CmContactLocationUpdateOneMutation = mutationField(
  'updateOneCmContactLocation',
  {
    type: nonNull('CmContactLocation'),
    args: {
      data: nonNull('CmContactLocationUpdateInput'),
      where: nonNull('CmContactLocationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactLocation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
