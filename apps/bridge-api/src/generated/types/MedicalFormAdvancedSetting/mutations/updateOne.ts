import { mutationField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingUpdateOneMutation = mutationField(
  'updateOneMedicalFormAdvancedSetting',
  {
    type: nonNull('MedicalFormAdvancedSetting'),
    args: {
      where: nonNull('MedicalFormAdvancedSettingWhereUniqueInput'),
      data: nonNull('MedicalFormAdvancedSettingUpdateInput'),
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
