import { objectType } from 'nexus'

export const BookitProSlider = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookitProSlider',
  definition(t) {
    t.int('id')
    t.string('slider1')
    t.string('slider2')
    t.string('slider3')
    t.string('slider4')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
