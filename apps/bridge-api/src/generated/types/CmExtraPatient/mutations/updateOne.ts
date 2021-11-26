import { mutationField, nonNull } from 'nexus'

export const CmExtraPatientUpdateOneMutation = mutationField(
  'updateOneCmExtraPatient',
  {
    type: nonNull('CmExtraPatient'),
    args: {
      data: nonNull('CmExtraPatientUpdateInput'),
      where: nonNull('CmExtraPatientWhereUniqueInput'),
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
