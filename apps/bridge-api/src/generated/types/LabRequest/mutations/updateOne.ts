import { mutationField, nonNull } from 'nexus'

export const LabRequestUpdateOneMutation = mutationField(
  'updateOneLabRequest',
  {
    type: nonNull('LabRequest'),
    args: {
      where: nonNull('LabRequestWhereUniqueInput'),
      data: nonNull('LabRequestUpdateInput'),
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
