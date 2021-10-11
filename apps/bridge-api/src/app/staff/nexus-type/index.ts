import { objectType } from 'nexus'
import { Context } from '../../../context'
import { PublicServiceUserTierResponse } from '../../service'
import { PublicSocialSurveyFeedbackResponse } from '../../survey/nexus-type'

export const CompanyPositionResponse = objectType({
  name: 'Company_Position',
  definition(t) {
    t.string('position')
  },
})

export const PublicStaffResponse = objectType({
  name: 'Public_Staff',
  definition(t) {
    t.int('ID')
    t.string('Avatar')
    t.string('Location')
    t.int('DefaultLocation')
    t.field('Public_User', {
      type: PublicUserResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.cmStaffGeneral
          .findUnique({
            where: { ID: parent.ID || undefined },
          })
          .User()
      },
    })
    t.string('Position', {
      async resolve(parent, input, ctx: Context) {
        const res = await ctx.prisma.cmStaffGeneral
          .findUnique({
            where: { ID: parent.ID || undefined },
          })
          .CompanyPosition()

        return res.position
      },
    })
  },
})

export const PublicUserResponse = objectType({
  name: 'Public_User',
  definition(t) {
    t.int('id')
    t.string('full_name')
    t.string('image')
    t.list.field('Public_ServiceUserTier', {
      type: PublicServiceUserTierResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .ServiceUserTier()
      },
    })
    t.list.field('Public_SocialSurveyFeedback', {
      type: PublicSocialSurveyFeedbackResponse,
      resolve(parent, input, ctx: Context) {
        return ctx.prisma.user
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
  },
})
