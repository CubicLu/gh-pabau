import { objectType, arg, extendType } from 'nexus'

export const CmLead = objectType({
  name: 'CmLead',
  definition(t) {
    t.model.ID()
    t.model.Avatar()
    t.model.OwnerID()
    t.model.ContactID()
    t.model.Salutation()
    t.model.Fname()
    t.model.Lname()
    t.model.DOB()
    t.model.Title()
    t.model.LeadCompany()
    t.model.company_id()
    t.model.Email()
    t.model.Phone()
    t.model.Fax()
    t.model.Mobile()
    t.model.Website()
    t.model.LeadSource()
    t.model.LeadStatus()
    t.model.Industry()
    t.model.NoOfEmp()
    t.model.AnualRevenue()
    t.model.Rating()
    t.model.EmailOptOut()
    t.model.SkypeId()
    t.model.SecondaryEmail()
    t.model.Twitter()
    t.model.MailingStreet()
    t.model.MailingCity()
    t.model.MailingProvince()
    t.model.MailingPostal()
    t.model.MailingCountry()
    t.model.Description()
    t.model.EnumStatus()
    t.model.Status()
    t.model.CreatedDate()
    t.model.MarketingOptInAll()
    t.model.MarketingOptInEmail()
    t.model.MarketingOptInPhone()
    t.model.MarketingOptInPost()
    t.model.MarketingOptInText()
    t.model.MarketingOptInNewsletter()
    t.model.IpAddress()
    t.model.fbimg()
    t.model.LastUpdated()
    t.model.custom_tag1()
    t.model.online_capture()
    t.model.capture_id()
    t.model.old_LeadStatus()
    t.model.custom_id()
    t.model.imported()
    t.model.ConvertDate()
    t.model.group_id()
    t.model.first_interaction()
    t.model.latest_interaction()
    t.model.location_id()
    t.model.need_to_knows()
    t.model.Company()
  },
})

export const cmLeadQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmLead()
    t.field('findFirstCmLead', {
      type: 'CmLead',
      args: {
        where: 'CmLeadWhereInput',
        orderBy: arg({ type: 'CmLeadOrderByInput' }),
        cursor: 'CmLeadWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmLead.findFirst(args as any)
      },
    })
    t.crud.cmLeads({ filtering: true, ordering: true })
    t.field('cmLeadsCount', {
      type: 'Int',
      args: {
        where: 'CmLeadWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmLead.count(args as any)
      },
    })
  },
})

export const cmLeadMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmLead()
    t.crud.updateOneCmLead()
    t.crud.upsertOneCmLead()
    t.crud.deleteOneCmLead()
    t.crud.updateManyCmLead()
  },
})
