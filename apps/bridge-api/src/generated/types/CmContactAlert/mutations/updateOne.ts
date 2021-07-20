import { mutationField, nonNull } from 'nexus'

export const CmContactAlertUpdateOneMutation = mutationField(
  'updateOneCmContactAlert',
  {
    type: nonNull('CmContactAlert'),
    args: {
      where: nonNull('CmContactAlertWhereUniqueInput'),
      data: nonNull('CmContactAlertUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactAlert.update({
        where,
        data,
        ...select,
      })
    },
  },
)
