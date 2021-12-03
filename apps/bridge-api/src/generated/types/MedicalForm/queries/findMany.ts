import { queryField, nonNull, list } from 'nexus'

export const MedicalFormFindManyQuery = queryField('findManyMedicalForm', {
  type: nonNull(list(nonNull('MedicalForm'))),
  args: {
    where: 'MedicalFormWhereInput',
    orderBy: list('MedicalFormOrderByWithRelationInput'),
    cursor: 'MedicalFormWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('MedicalFormScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalForm.findMany({
      ...args,
      ...select,
    })
  },
})
