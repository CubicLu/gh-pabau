import { mutationField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingUpdateOneMutation = mutationField(
  'updateOneMedicalFormAdvancedSetting',
  {
    type: nonNull('MedicalFormAdvancedSetting'),
    args: {
      data: nonNull('MedicalFormAdvancedSettingUpdateInput'),
      where: nonNull('MedicalFormAdvancedSettingWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.update({
        where,
        data,
        ...select,
      })
    },
  },
)
