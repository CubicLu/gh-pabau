import { objectType, arg, extendType } from 'nexus'

export const Page = objectType({
  name: 'Page',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.link()
    t.model.parent()
    t.model.category()
    t.model.showcase()
    t.model.description()
    t.model.features()
    t.model.new()
    t.model.img()
    t.model.admin()
    t.model.order()
    t.model.cover()
    t.model.tickier_order()
    t.model.friendly_name()
    t.model.app_weight()
    t.model.video_link()
    t.model.large_thumb()
    t.model.inactive()
    t.model.private_key()
    t.model.new_url()
    t.model.UserPermission()
  },
})

export const pageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.page()
    t.field('findFirstPage', {
      type: 'Page',
      args: {
        where: 'PageWhereInput',
        orderBy: arg({ type: 'PageOrderByInput' }),
        cursor: 'PageWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.page.findFirst(args as any)
      },
    })
    t.crud.pages({ filtering: true, ordering: true })
    t.field('pagesCount', {
      type: 'Int',
      args: {
        where: 'PageWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.page.count(args as any)
      },
    })
  },
})

export const pageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePage()
    t.crud.updateOnePage()
    t.crud.upsertOnePage()
    t.crud.deleteOnePage()
    t.crud.updateManyPage()
  },
})
