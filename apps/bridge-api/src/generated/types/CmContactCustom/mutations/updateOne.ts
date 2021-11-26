import { mutationField, nonNull } from 'nexus'

export const CmContactCustomUpdateOneMutation = mutationField(
  'updateOneCmContactCustom',
  {
    type: nonNull('CmContactCustom'),
    args: {
      data: nonNull('CmContactCustomUpdateInput'),
      where: nonNull('CmContactCustomWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactCustom.update({
        where,
        data,
        ...select,
      })
    },
  },
)
