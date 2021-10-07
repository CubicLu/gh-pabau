import { mutationField, nonNull } from 'nexus'

export const CmExtraPatientUpdateOneMutation = mutationField(
  'updateOneCmExtraPatient',
  {
    type: nonNull('CmExtraPatient'),
    args: {
      where: nonNull('CmExtraPatientWhereUniqueInput'),
      data: nonNull('CmExtraPatientUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmExtraPatient.update({
        where,
        data,
        ...select,
      })
    },
  },
)
