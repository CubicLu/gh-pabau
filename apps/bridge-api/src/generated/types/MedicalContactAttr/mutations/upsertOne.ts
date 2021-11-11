import { mutationField, nonNull } from 'nexus'

export const MedicalContactAttrUpsertOneMutation = mutationField(
  'upsertOneMedicalContactAttr',
  {
    type: nonNull('MedicalContactAttr'),
    args: {
      where: nonNull('MedicalContactAttrWhereUniqueInput'),
      create: nonNull('MedicalContactAttrCreateInput'),
      update: nonNull('MedicalContactAttrUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalContactAttr.upsert({
        ...args,
        ...select,
      })
    },
  },
)
