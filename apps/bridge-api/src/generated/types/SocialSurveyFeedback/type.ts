import { objectType } from 'nexus'

export const SocialSurveyFeedback = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SocialSurveyFeedback',
  definition(t) {
    t.int('id')
    t.int('rating')
    t.nullable.int('contact_id')
    t.string('feedback_source')
    t.int('company_id')
    t.int('date')
    t.string('feedback_comment')
    t.string('feedback_name')
    t.string('feedback_status')
    t.int('related_id')
    t.string('related_to')
    t.nullable.int('feedback_for')
    t.string('service')
    t.int('public_use')
    t.int('service_id')
    t.string('owner_response')
    t.nullable.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('CompanyService', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.CompanyService
      },
    })
    t.list.field('Response', {
      type: 'SocialSurveyFeedbackResponse',
      args: {
        where: 'SocialSurveyFeedbackResponseWhereInput',
        orderBy: 'SocialSurveyFeedbackResponseOrderByWithRelationInput',
        cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyFeedbackResponseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Response
      },
    })
    t.list.field('SocialSurveyAnswer', {
      type: 'SocialSurveyAnswer',
      args: {
        where: 'SocialSurveyAnswerWhereInput',
        orderBy: 'SocialSurveyAnswerOrderByWithRelationInput',
        cursor: 'SocialSurveyAnswerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyAnswerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurveyAnswer
      },
    })
    t.nullable.field('_count', {
      type: 'SocialSurveyFeedbackCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
