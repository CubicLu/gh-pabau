import { mutationField, nonNull } from 'nexus'

export const ContactMedicalConditionUpdateOneMutation = mutationField(
  'updateOneContactMedicalCondition',
  {
    type: nonNull('ContactMedicalCondition'),
    args: {
      data: nonNull('ContactMedicalConditionUpdateInput'),
      where: nonNull('ContactMedicalConditionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactMedicalCondition.update({
        where,
        data,
        ...select,
      })
    },
  },
)
