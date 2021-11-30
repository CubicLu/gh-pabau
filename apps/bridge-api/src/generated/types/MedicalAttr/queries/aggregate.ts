import { queryField, list } from 'nexus'

export const MedicalAttrAggregateQuery = queryField('aggregateMedicalAttr', {
  type: 'AggregateMedicalAttr',
  args: {
    where: 'MedicalAttrWhereInput',
    orderBy: list('MedicalAttrOrderByWithRelationInput'),
    cursor: 'MedicalAttrWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalAttr.aggregate({ ...args, ...select }) as any
  },
})
