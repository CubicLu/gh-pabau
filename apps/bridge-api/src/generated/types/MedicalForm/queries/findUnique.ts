import { queryField, nonNull } from 'nexus'

export const MedicalFormFindUniqueQuery = queryField('findUniqueMedicalForm', {
  type: 'MedicalForm',
  args: {
    where: nonNull('MedicalFormWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.medicalForm.findUnique({
      where,
      ...select,
    })
  },
})
