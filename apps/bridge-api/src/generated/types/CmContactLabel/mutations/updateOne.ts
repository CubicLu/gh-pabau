import { mutationField, nonNull } from 'nexus'

export const CmContactLabelUpdateOneMutation = mutationField(
  'updateOneCmContactLabel',
  {
    type: nonNull('CmContactLabel'),
    args: {
      where: nonNull('CmContactLabelWhereUniqueInput'),
      data: nonNull('CmContactLabelUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactLabel.update({
        where,
        data,
        ...select,
      })
    },
  },
)
