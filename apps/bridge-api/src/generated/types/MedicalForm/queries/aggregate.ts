import { queryField, list } from 'nexus'

export const MedicalFormAggregateQuery = queryField('aggregateMedicalForm', {
  type: 'AggregateMedicalForm',
  args: {
    where: 'MedicalFormWhereInput',
    orderBy: list('MedicalFormOrderByWithRelationInput'),
    cursor: 'MedicalFormWhereUniqueInput',
    distinct: 'MedicalFormScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalForm.aggregate({ ...args, ...select }) as any
  },
})
