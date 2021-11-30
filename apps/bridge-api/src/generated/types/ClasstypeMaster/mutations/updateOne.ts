import { mutationField, nonNull } from 'nexus'

export const ClasstypeMasterUpdateOneMutation = mutationField(
  'updateOneClasstypeMaster',
  {
    type: nonNull('ClasstypeMaster'),
    args: {
      data: nonNull('ClasstypeMasterUpdateInput'),
      where: nonNull('ClasstypeMasterWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classtypeMaster.update({
        where,
        data,
        ...select,
      })
    },
  },
)
