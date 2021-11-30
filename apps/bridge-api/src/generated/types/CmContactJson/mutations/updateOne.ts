import { mutationField, nonNull } from 'nexus'

export const CmContactJsonUpdateOneMutation = mutationField(
  'updateOneCmContactJson',
  {
    type: nonNull('CmContactJson'),
    args: {
      data: nonNull('CmContactJsonUpdateInput'),
      where: nonNull('CmContactJsonWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactJson.update({
        where,
        data,
        ...select,
      })
    },
  },
)
