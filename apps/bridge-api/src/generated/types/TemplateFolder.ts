import { objectType, arg, extendType } from 'nexus'

export const TemplateFolder = objectType({
  name: 'TemplateFolder',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.folder_name()
    t.model.folder_description()
    t.model.Company()
    t.model.MessageTemplate()
  },
})

export const templateFolderQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.templateFolder()
    t.field('findFirstTemplateFolder', {
      type: 'TemplateFolder',
      args: {
        where: 'TemplateFolderWhereInput',
        orderBy: arg({ type: 'TemplateFolderOrderByInput' }),
        cursor: 'TemplateFolderWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.templateFolder.findFirst(args as any)
      },
    })
    t.crud.templateFolders({ filtering: true, ordering: true })
    t.field('templateFoldersCount', {
      type: 'Int',
      args: {
        where: 'TemplateFolderWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.templateFolder.count(args as any)
      },
    })
  },
})

export const templateFolderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTemplateFolder()
    t.crud.updateOneTemplateFolder()
    t.crud.upsertOneTemplateFolder()
    t.crud.deleteOneTemplateFolder()
    t.crud.updateManyTemplateFolder()
  },
})
