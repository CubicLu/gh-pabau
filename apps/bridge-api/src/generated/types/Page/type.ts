import { objectType } from 'nexus'

export const Page = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Page',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('link')
    t.nullable.int('parent')
    t.string('category')
    t.int('showcase')
    t.string('description')
    t.string('features')
    t.int('new')
    t.string('img')
    t.int('admin')
    t.int('order')
    t.string('cover')
    t.int('tickier_order')
    t.string('friendly_name')
    t.int('app_weight')
    t.string('video_link')
    t.string('large_thumb')
    t.int('inactive')
    t.string('private_key')
    t.string('new_url')
    t.list.field('UserPermission', {
      type: 'UserPermission',
      args: {
        where: 'UserPermissionWhereInput',
        orderBy: 'UserPermissionOrderByWithRelationInput',
        cursor: 'UserPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserPermission
      },
    })
    t.list.field('CompanyPermission', {
      type: 'CompanyPermission',
      args: {
        where: 'CompanyPermissionWhereInput',
        orderBy: 'CompanyPermissionOrderByWithRelationInput',
        cursor: 'CompanyPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyPermission
      },
    })
    t.nullable.field('ParrentPage', {
      type: 'Page',
      resolve(root: any) {
        return root.ParrentPage
      },
    })
    t.list.field('Page', {
      type: 'Page',
      args: {
        where: 'PageWhereInput',
        orderBy: 'PageOrderByWithRelationInput',
        cursor: 'PageWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PageScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Page
      },
    })
    t.field('_count', {
      type: 'PageCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
