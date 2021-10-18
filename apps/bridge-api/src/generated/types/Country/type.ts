import { objectType } from 'nexus'

export const Country = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Country',
  definition(t) {
    t.int('country_id')
    t.string('CountryCode')
    t.string('country_name')
    t.string('Currency')
    t.string('Continent')
    t.int('phone_prefix')
    t.float('sms_base_rate')
    t.string('date_format')
    t.string('tax_name')
    t.float('sms_multiplier')
    t.string('general_information')
    t.string('vaccine_recommendations')
    t.string('other_risks')
    t.string('outbreaks')
    t.string('malaria')
    t.string('nathnac_url')
    t.string('travax_url')
    t.string('gmaps_url')
    t.string('custom_id')
    t.list.field('CmContactTravel', {
      type: 'CmContactTravel',
      args: {
        where: 'CmContactTravelWhereInput',
        orderBy: 'CmContactTravelOrderByWithRelationInput',
        cursor: 'CmContactTravelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactTravelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactTravel
      },
    })
    t.nullable.field('_count', {
      type: 'CountryCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
