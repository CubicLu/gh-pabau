import { mutationField, nonNull } from 'nexus'

export const InsuranceDetailUpdateOneMutation = mutationField(
  'updateOneInsuranceDetail',
  {
    type: nonNull('InsuranceDetail'),
    args: {
      data: nonNull('InsuranceDetailUpdateInput'),
      where: nonNull('InsuranceDetailWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.insuranceDetail.update({
        where,
        data,
        ...select,
      })
    },
  },
)
