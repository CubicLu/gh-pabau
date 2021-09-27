import { objectType } from 'nexus'
import { Context } from '../../../context'

export const PublicMasterCategoryResponse = objectType({
  name: 'PublicMasterCategoryResponse',
  definition(t) {
    t.id('id')
    t.int('company_id')
    t.string('image')
    t.string('name')
    t.string('type')
    t.list.field('Public_ServiceCategories', {
      type: PublicServiceCategoryResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.servicesMasterCategory
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .ServiceCategory()

        // Wrong approach, keeping for reference for devs
        // const res = ctx.prisma.serviceCategory.findUnique({
        //   where: { master_cat_id: parent.id || undefined },
        // })
      },
    })
  },
})

export const PublicServiceCategoryResponse = objectType({
  name: 'PublicServiceCategoryResponse',
  definition(t) {
    t.id('id')
    t.int('company_id')
    t.string('name')
    t.int('cat_order')
    t.string('image')
    t.string('group_color')
    t.float('deposit_amount')
    t.list.field('Public_Services', {
      type: PublicServiceResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.serviceCategory
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .CompanyService()
      },
    })
  },
})

export const PublicServiceResponse = objectType({
  name: 'PublicServiceResponse',
  definition(t) {
    t.id('id')
    t.string('name')
    t.float('price')
    t.int('online_book')
    t.string('disabled_locations')
    t.string('disabled_users')
    t.string('duration')
    t.string('friendly_name')
    t.int('max_clients')
    t.int('online_only_service')
  },
})
