import { mutationField, nonNull } from 'nexus'

export const ClassTemplateSettingDeleteOneMutation = mutationField(
  'deleteOneClassTemplateSetting',
  {
    type: 'ClassTemplateSetting',
    args: {
      where: nonNull('ClassTemplateSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classTemplateSetting.delete({
        where,
        ...select,
      })
    },
  },
)
