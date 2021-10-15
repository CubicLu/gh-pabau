import { queryField, nonNull, list } from 'nexus'

export const MedicalFormAdvancedSettingFindManyQuery = queryField(
  'findManyMedicalFormAdvancedSetting',
  {
    type: nonNull(list(nonNull('MedicalFormAdvancedSetting'))),
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      distinct: 'MedicalFormAdvancedSettingScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
