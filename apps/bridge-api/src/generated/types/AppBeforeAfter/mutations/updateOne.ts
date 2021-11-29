import { mutationField, nonNull } from 'nexus'

export const AppBeforeAfterUpdateOneMutation = mutationField(
  'updateOneAppBeforeAfter',
  {
    type: nonNull('AppBeforeAfter'),
    args: {
      data: nonNull('AppBeforeAfterUpdateInput'),
      where: nonNull('AppBeforeAfterWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.appBeforeAfter.update({
        where,
        data,
        ...select,
      })
    },
  },
)
