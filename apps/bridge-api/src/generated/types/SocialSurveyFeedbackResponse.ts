import { objectType, arg, extendType } from 'nexus'

export const SocialSurveyFeedbackResponse = objectType({
  name: 'SocialSurveyFeedbackResponse',
  definition(t) {
    t.model.id()
    t.model.response()
    t.model.date()
    t.model.company_id()
    t.model.uid()
    t.model.review_id()
    t.model.Company()
    t.model.User()
    t.model.Feedback()
  },
})

export const socialSurveyFeedbackResponseQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.socialSurveyFeedbackResponse()
    t.field('findFirstSocialSurveyFeedbackResponse', {
      type: 'SocialSurveyFeedbackResponse',
      args: {
        where: 'SocialSurveyFeedbackResponseWhereInput',
        orderBy: arg({ type: 'SocialSurveyFeedbackResponseOrderByInput' }),
        cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyFeedbackResponse.findFirst(args as any)
      },
    })
    t.crud.socialSurveyFeedbackResponses({ filtering: true, ordering: true })
    t.field('socialSurveyFeedbackResponsesCount', {
      type: 'Int',
      args: {
        where: 'SocialSurveyFeedbackResponseWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyFeedbackResponse.count(args as any)
      },
    })
  },
})

export const socialSurveyFeedbackResponseMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneSocialSurveyFeedbackResponse()
    t.crud.updateOneSocialSurveyFeedbackResponse()
    t.crud.upsertOneSocialSurveyFeedbackResponse()
    t.crud.deleteOneSocialSurveyFeedbackResponse()
    t.crud.updateManySocialSurveyFeedbackResponse()
  },
})
