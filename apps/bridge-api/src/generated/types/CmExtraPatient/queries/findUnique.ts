import { queryField, nonNull } from 'nexus'

export const CmExtraPatientFindUniqueQuery = queryField(
  'findUniqueCmExtraPatient',
  {
    type: 'CmExtraPatient',
    args: {
      where: nonNull('CmExtraPatientWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmExtraPatient.findUnique({
        where,
        ...select,
      })
    },
  },
)
