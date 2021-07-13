import { mutationField, nonNull } from 'nexus'

export const CmExtraPatientCreateOneMutation = mutationField(
  'createOneCmExtraPatient',
  {
    type: nonNull('CmExtraPatient'),
    args: {
      data: nonNull('CmExtraPatientCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmExtraPatient.create({
        data,
        ...select,
      })
    },
  },
)
