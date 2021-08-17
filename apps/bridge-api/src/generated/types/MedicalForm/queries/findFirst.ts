import { queryField, list } from 'nexus'

export const MedicalFormFindFirstQuery = queryField('findFirstMedicalForm', {
  type: 'MedicalForm',
  args: {
    where: 'MedicalFormWhereInput',
    orderBy: list('MedicalFormOrderByInput'),
    cursor: 'MedicalFormWhereUniqueInput',
    distinct: 'MedicalFormScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalForm.findFirst({
      ...args,
      ...select,
    })
  },
})
