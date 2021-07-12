import { objectType } from 'nexus'

export const SocialSurveyQuestion = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SocialSurveyQuestion',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('question')
    t.string('answer')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
