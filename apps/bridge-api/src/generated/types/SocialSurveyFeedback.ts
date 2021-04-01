import { objectType, arg, extendType } from 'nexus'

export const SocialSurveyFeedback = objectType({
  name: 'SocialSurveyFeedback',
  definition(t) {
    t.model.id()
    t.model.rating()
    t.model.contact_id()
    t.model.feedback_source()
    t.model.company_id()
    t.model.date()
    t.model.feedback_comment()
    t.model.feedback_name()
    t.model.feedback_status()
    t.model.related_id()
    t.model.related_to()
    t.model.feedback_for()
    t.model.service()
    t.model.public_use()
    t.model.service_id()
    t.model.owner_response()
    t.model.CmContact()
    t.model.Company()
    t.model.SocialSurveyAnswer()
  },
})

export const socialSurveyFeedbackQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.socialSurveyFeedback()
    t.field('findFirstSocialSurveyFeedback', {
      type: 'SocialSurveyFeedback',
      args: {
        where: 'SocialSurveyFeedbackWhereInput',
        orderBy: arg({ type: 'SocialSurveyFeedbackOrderByInput' }),
        cursor: 'SocialSurveyFeedbackWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyFeedback.findFirst(args as any)
      },
    })
    t.crud.socialSurveyFeedbacks({ filtering: true, ordering: true })
    t.field('socialSurveyFeedbacksCount', {
      type: 'Int',
      args: {
        where: 'SocialSurveyFeedbackWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyFeedback.count(args as any)
      },
    })
  },
})

export const socialSurveyFeedbackMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneSocialSurveyFeedback()
    t.crud.updateOneSocialSurveyFeedback()
    t.crud.upsertOneSocialSurveyFeedback()
    t.crud.deleteOneSocialSurveyFeedback()
    t.crud.updateManySocialSurveyFeedback()
  },
})
