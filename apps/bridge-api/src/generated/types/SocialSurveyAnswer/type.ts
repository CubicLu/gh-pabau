import { objectType } from 'nexus'

export const SocialSurveyAnswer = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SocialSurveyAnswer',
  definition(t) {
    t.int('id')
    t.int('feedback_id')
    t.string('question')
    t.string('answer')
    t.field('SocialSurveyFeedback', {
      type: 'SocialSurveyFeedback',
      resolve(root: any) {
        return root.SocialSurveyFeedback
      },
    })
  },
})
