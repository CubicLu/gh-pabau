import { objectType } from 'nexus'

export const SocialSurveyFeedbackResponse = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SocialSurveyFeedbackResponse',
  definition(t) {
    t.int('id')
    t.string('response')
    t.field('date', { type: 'DateTime' })
    t.int('company_id')
    t.int('uid')
    t.int('review_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.field('Feedback', {
      type: 'SocialSurveyFeedback',
      resolve(root: any) {
        return root.Feedback
      },
    })
  },
})
