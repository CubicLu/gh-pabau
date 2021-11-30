import { mutationField, nonNull } from 'nexus'

export const LabRequestUpdateOneMutation = mutationField(
  'updateOneLabRequest',
  {
    type: nonNull('LabRequest'),
    args: {
      data: nonNull('LabRequestUpdateInput'),
      where: nonNull('LabRequestWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.labRequest.update({
        where,
        data,
        ...select,
      })
    },
  },
)
