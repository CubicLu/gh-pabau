import { mutationField, nonNull } from 'nexus'

export const InsuranceDetailUpdateOneMutation = mutationField(
  'updateOneInsuranceDetail',
  {
    type: nonNull('InsuranceDetail'),
    args: {
      where: nonNull('InsuranceDetailWhereUniqueInput'),
      data: nonNull('InsuranceDetailUpdateInput'),
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
