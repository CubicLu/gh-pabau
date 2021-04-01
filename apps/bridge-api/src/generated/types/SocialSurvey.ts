import { objectType, arg, extendType } from 'nexus'

export const SocialSurvey = objectType({
  name: 'SocialSurvey',
  definition(t) {
    t.model.id()
    t.model.page_id()
    t.model.company_id()
    t.model.twitter_id()
    t.model.disable_email()
    t.model.disable_sms()
    t.model.sms_message_id()
    t.model.from_name()
    t.model.sms_days_after()
    t.model.sms_send_time()
    t.model.feedback_title()
    t.model.feedback_subtitle()
    t.model.feedback_question()
    t.model.auto_facebook()
    t.model.auto_twitter()
    t.model.after_page()
    t.model.google_plus_link()
    t.model.google_review()
    t.model.google_review_url()
    t.model.aweber_code()
    t.model.score_indicator()
    t.model.add_note()
    t.model.post_buzzfeed()
    t.model.post_website()
    t.model.email_message_id()
    t.model.redirect_url()
    t.model.feedback_name()
    t.model.ty_enable_email()
    t.model.ty_enable_sms()
    t.model.ty_email_id()
    t.model.ty_sms_id()
    t.model.color_1()
    t.model.color_2()
    t.model.google_review_redirect()
    t.model.show_reviews_above()
    t.model.logo_position()
    t.model.logo_height()
    t.model.hits()
    t.model.Company()
  },
})

export const socialSurveyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.socialSurvey()
    t.field('findFirstSocialSurvey', {
      type: 'SocialSurvey',
      args: {
        where: 'SocialSurveyWhereInput',
        orderBy: arg({ type: 'SocialSurveyOrderByInput' }),
        cursor: 'SocialSurveyWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurvey.findFirst(args as any)
      },
    })
    t.crud.socialSurveys({ filtering: true, ordering: true })
    t.field('socialSurveysCount', {
      type: 'Int',
      args: {
        where: 'SocialSurveyWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurvey.count(args as any)
      },
    })
  },
})

export const socialSurveyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneSocialSurvey()
    t.crud.updateOneSocialSurvey()
    t.crud.upsertOneSocialSurvey()
    t.crud.deleteOneSocialSurvey()
    t.crud.updateManySocialSurvey()
  },
})
