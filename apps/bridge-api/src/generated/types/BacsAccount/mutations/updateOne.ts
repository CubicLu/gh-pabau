import { mutationField, nonNull } from 'nexus'

export const BacsAccountUpdateOneMutation = mutationField(
  'updateOneBacsAccount',
  {
    type: nonNull('BacsAccount'),
    args: {
      data: nonNull('BacsAccountUpdateInput'),
      where: nonNull('BacsAccountWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bacsAccount.update({
        where,
        data,
        ...select,
      })
    },
  },
)
