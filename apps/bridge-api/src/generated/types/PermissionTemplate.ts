import { objectType, arg, extendType } from 'nexus'

export const PermissionTemplate = objectType({
  name: 'PermissionTemplate',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company_id()
    t.model.app_permissions()
    t.model.user_permissions()
    t.model.mobile_permissions()
    t.model.mobile_widgets()
    t.model.disabled_services()
    t.model.alerts()
    t.model.is_admin()
    t.model.enabled_reports()
    t.model.all_reports()
    t.model.Company()
    t.model.UserGroup()
  },
})

export const permissionTemplateQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.permissionTemplate()
    t.field('findFirstPermissionTemplate', {
      type: 'PermissionTemplate',
      args: {
        where: 'PermissionTemplateWhereInput',
        orderBy: arg({ type: 'PermissionTemplateOrderByInput' }),
        cursor: 'PermissionTemplateWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.permissionTemplate.findFirst(args as any)
      },
    })
    t.crud.permissionTemplates({ filtering: true, ordering: true })
    t.field('permissionTemplatesCount', {
      type: 'Int',
      args: {
        where: 'PermissionTemplateWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.permissionTemplate.count(args as any)
      },
    })
  },
})

export const permissionTemplateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePermissionTemplate()
    t.crud.updateOnePermissionTemplate()
    t.crud.upsertOnePermissionTemplate()
    t.crud.deleteOnePermissionTemplate()
    t.crud.updateManyPermissionTemplate()
  },
})
