import { mutationField, nonNull } from 'nexus'

export const CmContactAlertCreateOneMutation = mutationField(
  'createOneCmContactAlert',
  {
    type: nonNull('CmContactAlert'),
    args: {
      data: nonNull('CmContactAlertCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactAlert.create({
        data,
        ...select,
      })
    },
  },
)
