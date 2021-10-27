import { mutationField, nonNull } from 'nexus'

export const MedicalAttrCreateOneMutation = mutationField(
  'createOneMedicalAttr',
  {
    type: nonNull('MedicalAttr'),
    args: {
      data: nonNull('MedicalAttrCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalAttr.create({
        data,
        ...select,
      })
    },
  },
)
