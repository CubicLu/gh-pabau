import { queryField, list } from 'nexus'

export const MedicalFormAdvancedSettingAggregateQuery = queryField(
  'aggregateMedicalFormAdvancedSetting',
  {
    type: 'AggregateMedicalFormAdvancedSetting',
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByWithRelationInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
