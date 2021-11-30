import { queryField, list } from 'nexus'

export const MedicalFormFindFirstQuery = queryField('findFirstMedicalForm', {
  type: 'MedicalForm',
  args: {
    where: 'MedicalFormWhereInput',
    orderBy: list('MedicalFormOrderByWithRelationInput'),
    cursor: 'MedicalFormWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('MedicalFormScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalForm.findFirst({
      ...args,
      ...select,
    })
  },
})
