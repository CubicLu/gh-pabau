import { mutationField, nonNull } from 'nexus'

export const ReportUpdateOneMutation = mutationField('updateOneReport', {
  type: nonNull('Report'),
  args: {
    where: nonNull('ReportWhereUniqueInput'),
    data: nonNull('ReportUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.report.update({
      where,
      data,
      ...select,
    })
  },
})
