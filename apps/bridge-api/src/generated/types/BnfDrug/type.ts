import { objectType } from 'nexus'

export const BnfDrug = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BnfDrug',
  definition(t) {
    t.int('id')
    t.string('url')
    t.string('page')
    t.string('drug_name')
    t.nullable.string('indications_dosage')
    t.nullable.string('contra_indications')
    t.nullable.string('cautions')
    t.nullable.string('side_effects')
    t.nullable.string('pregnancy')
    t.nullable.string('breast_feeding')
    t.nullable.string('prescribing_info')
    t.nullable.string('patient_advice')
    t.nullable.string('directions')
    t.nullable.string('specific_info')
  },
})
