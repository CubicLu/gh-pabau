import { mutationField, nonNull } from 'nexus'

export const CmExtraSalonUpdateOneMutation = mutationField(
  'updateOneCmExtraSalon',
  {
    type: nonNull('CmExtraSalon'),
    args: {
      where: nonNull('CmExtraSalonWhereUniqueInput'),
      data: nonNull('CmExtraSalonUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmExtraSalon.update({
        where,
        data,
        ...select,
      })
    },
  },
)
