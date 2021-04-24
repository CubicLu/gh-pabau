import { objectType, arg, extendType } from 'nexus'

export const Country = objectType({
  name: 'Country',
  definition(t) {
    t.model.country_id()
    t.model.CountryCode()
    t.model.country_name()
    t.model.Currency()
    t.model.Continent()
    t.model.phone_prefix()
    t.model.sms_base_rate()
    t.model.date_format()
    t.model.tax_name()
    t.model.sms_multiplier()
    t.model.general_information()
    t.model.vaccine_recommendations()
    t.model.other_risks()
    t.model.outbreaks()
    t.model.malaria()
    t.model.nathnac_url()
    t.model.travax_url()
    t.model.gmaps_url()
    t.model.custom_id()
    t.model.CmContactTravel()
  },
})

export const countryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.country()
    t.field('findFirstCountry', {
      type: 'Country',
      args: {
        where: 'CountryWhereInput',
        orderBy: arg({ type: 'CountryOrderByInput' }),
        cursor: 'CountryWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.country.findFirst(args as any)
      },
    })
    t.crud.countries({ filtering: true, ordering: true })
    t.field('countriesCount', {
      type: 'Int',
      args: {
        where: 'CountryWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.country.count(args as any)
      },
    })
  },
})

export const countryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCountry()
    t.crud.updateOneCountry()
    t.crud.upsertOneCountry()
    t.crud.deleteOneCountry()
    t.crud.updateManyCountry()
  },
})
