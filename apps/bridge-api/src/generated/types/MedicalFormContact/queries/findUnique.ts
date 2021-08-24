import { queryField, nonNull } from 'nexus'

export const MedicalFormContactFindUniqueQuery = queryField(
  'findUniqueMedicalFormContact',
  {
    type: 'MedicalFormContact',
    args: {
      where: nonNull('MedicalFormContactWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.medicalFormContact.findUnique({
        where,
        ...select,
      })
    },
  },
)
