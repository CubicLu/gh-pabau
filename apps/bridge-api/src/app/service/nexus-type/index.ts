import { objectType } from 'nexus'
import { Context } from '../../../context'
import { PublicSocialSurveyFeedbackResponse } from '../../survey/nexus-type'
import { PublicServiceUserTierResponse } from './Public_ServiceUserTier'

export const StaffServices = objectType({
  name: 'StaffServices',
  definition(t) {
    t.int('id')
  },
})

export const PublicMasterCategoryResponse = objectType({
  name: 'PublicMasterCategoryResponse',
  definition(t) {
    t.int('id')
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
    t.int('id')
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
          .CompanyService({
            where: { availability: { in: ['ANY', 'BOOK'] }, online_book: 1 },
          })
      },
    })
  },
})

export const PublicServiceResponse = objectType({
  name: 'PublicServiceResponse',
  definition(t) {
    t.int('id')
    t.string('name')
    t.float('price')
    t.int('online_book')
    t.string('disabled_locations')
    t.string('disabledusers')
    t.string('duration')
    t.string('friendly_name')
    t.string('description')
    t.int('max_clients')
    t.int('online_only_service')
    t.float('rating', {
      async resolve(parent, input, ctx: Context) {
        const res = await ctx.prisma.socialSurveyFeedback.aggregate({
          _avg: {
            rating: true,
          },
          where: { service_id: parent.id || undefined },
        })
        return res._avg.rating
      },
    })
    t.list.field('Public_SocialSurveyFeedback', {
      type: PublicSocialSurveyFeedbackResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.companyService
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .SocialSurveyFeedback({
            where: {
              public_use: 1,
            },
          })
      },
    })
    t.list.field('Public_ServiceUserTier', {
      type: PublicServiceUserTierResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.companyService
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .ServiceUserTier()
      },
    })
  },
})
