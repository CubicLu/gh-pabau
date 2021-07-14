import { mutationField, nonNull } from 'nexus'

export const BacsAccountUpdateOneMutation = mutationField(
  'updateOneBacsAccount',
  {
    type: nonNull('BacsAccount'),
    args: {
      where: nonNull('BacsAccountWhereUniqueInput'),
      data: nonNull('BacsAccountUpdateInput'),
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
