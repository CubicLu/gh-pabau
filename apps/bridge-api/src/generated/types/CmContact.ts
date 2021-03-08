import { objectType, arg, extendType } from 'nexus'

export const CmContact = objectType({
  name: 'CmContact',
  definition(t) {
    t.model.ID()
    t.model.Avatar()
    t.model.OwnerID()
    t.model.Salutation()
    t.model.Fname()
    t.model.Occupier()
    t.model.locationId()
    t.model.Email()
    t.model.Phone()
    t.model.OtherPhone()
    t.model.Mobile()
    t.model.Assistant()
    t.model.ReportsTo()
    t.model.LeadSource()
    t.model.Lname()
    t.model.Title()
    t.model.Department()
    t.model.HomePhone()
    t.model.Fax()
    t.model.DOB()
    t.model.AsstPhone()
    t.model.EmailOptOut()
    t.model.SkypeId()
    t.model.AddToQuickBooks()
    t.model.SecondaryEmail()
    t.model.Twitter()
    t.model.MailingStreet()
    t.model.OtherStreet()
    t.model.MailingCity()
    t.model.OtherCity()
    t.model.MailingProvince()
    t.model.OtherProvince()
    t.model.MailingPostal()
    t.model.OtherPostal()
    t.model.MailingCountry()
    t.model.OtherCountry()
    t.model.Description()
    t.model.Status()
    t.model.CreatedDate()
    t.model.IpAddress()
    t.model.fbimg()
    t.model.MarketingSource()
    t.model.RefferalSource()
    t.model.LeadID()
    t.model.groupTag()
    t.model.politeNotice()
    t.model.customId()
    t.model.gender()
    t.model.MarketingOptInAll()
    t.model.MarketingOptInEmail()
    t.model.MarketingOptInPhone()
    t.model.MarketingOptInPost()
    t.model.MarketingOptInText()
    t.model.notesDrop()
    t.model.imported()
    t.model.alertsDrop()
    t.model.MarketingSourceRelated()
    t.model.customerReference()
    t.model.MarketingOptInNewsletter()
    t.model.customMarketingSource()
    t.model.insurerId()
    t.model.isActive()
    t.model.xeroContactId()
    t.model.isAmbassador()
    t.model.UpdatedDate()
    t.model.xeroUpdatedDate()
    t.model.discountType()
    t.model.customClinicId()
    t.model.ambassadorId()
    t.model.contractId()
    t.model.privacyPolicy()
    t.model.needToKnows()
    t.model.contactType()
  },
})

export const cmContactQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContact()
    t.field('findFirstCmContact', {
      type: 'CmContact',
      args: {
        where: 'CmContactWhereInput',
        orderBy: arg({ type: 'CmContactOrderByInput' }),
        cursor: 'CmContactWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContact.findFirst(args as any)
      },
    })
    t.crud.cmContacts({ filtering: true, ordering: true })
    t.field('cmContactsCount', {
      type: 'Int',
      args: {
        where: 'CmContactWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContact.count(args as any)
      },
    })
  },
})

export const cmContactMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContact()
    t.crud.updateOneCmContact()
    t.crud.upsertOneCmContact()
    t.crud.deleteOneCmContact()
    t.crud.updateManyCmContact()
    t.crud.deleteManyCmContact()
  },
})
