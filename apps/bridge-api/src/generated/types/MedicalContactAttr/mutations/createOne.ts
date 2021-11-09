import { mutationField, nonNull } from 'nexus'

export const MedicalContactAttrCreateOneMutation = mutationField(
  'createOneMedicalContactAttr',
  {
    type: nonNull('MedicalContactAttr'),
    args: {
      data: nonNull('MedicalContactAttrCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalContactAttr.create({
        data,
        ...select,
      })
    },
  },
)
