import { objectType, arg, extendType } from 'nexus'

export const MessageTemplate = objectType({
  name: 'MessageTemplate',
  definition(t) {
    t.model.template_id()
    t.model.company_id()
    t.model.template_name()
    t.model.subject()
    t.model.message()
    t.model.created_by()
    t.model.template_type()
    t.model.created_at()
    t.model.date_changed_at()
    t.model.template_sub_type()
    t.model.template_sub_type_service()
    t.model.parent_id()
    t.model.header()
    t.model.footer()
    t.model.exclude_margins()
    t.model.template_group()
    t.model.subtype_letter()
    t.model.word_template()
    t.model.is_default()
    t.model.folder_id()
    t.model.Company()
    t.model.TemplateFolder()
    t.model.User()
    t.model.ParrentTemplate()
    t.model.MessageTemplate()
  },
})

export const messageTemplateQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.messageTemplate()
    t.field('findFirstMessageTemplate', {
      type: 'MessageTemplate',
      args: {
        where: 'MessageTemplateWhereInput',
        orderBy: arg({ type: 'MessageTemplateOrderByInput' }),
        cursor: 'MessageTemplateWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.messageTemplate.findFirst(args as any)
      },
    })
    t.crud.messageTemplates({ filtering: true, ordering: true })
    t.field('messageTemplatesCount', {
      type: 'Int',
      args: {
        where: 'MessageTemplateWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.messageTemplate.count(args as any)
      },
    })
  },
})

export const messageTemplateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMessageTemplate()
    t.crud.updateOneMessageTemplate()
    t.crud.upsertOneMessageTemplate()
    t.crud.deleteOneMessageTemplate()
    t.crud.updateManyMessageTemplate()
  },
})
