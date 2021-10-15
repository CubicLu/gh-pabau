import { queryField, list } from 'nexus'

export const MedicalFormAdvancedSettingAggregateQuery = queryField(
  'aggregateMedicalFormAdvancedSetting',
  {
    type: 'AggregateMedicalFormAdvancedSetting',
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      distinct: 'MedicalFormAdvancedSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
