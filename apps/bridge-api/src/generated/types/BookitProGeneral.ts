import { objectType, arg, extendType } from 'nexus'

export const BookitProGeneral = objectType({
  name: 'BookitProGeneral',
  definition(t) {
    t.model.id()
    t.model.occupier()
    t.model.advanceTime()
    t.model.enablePayments()
    t.model.paypalAddress()
    t.model.receiveEmail()
    t.model.createInvoice()
    t.model.deposit()
    t.model.showPrices()
    t.model.showDuration()
    t.model.showDescription()
    t.model.headerColor()
    t.model.bookingEmails()
    t.model.onlineColor()
    t.model.warningMessage()
    t.model.allowCancel()
    t.model.disableFacebook()
    t.model.interval()
    t.model.disableExtraInformation()
    t.model.couponActive()
    t.model.paymentApiUrl()
    t.model.accountDeposit()
    t.model.replaceJobTitles()
    t.model.hideFacebookShare()
    t.model.enableBookings()
    t.model.defaultPayment()
    t.model.registrationOptional()
    t.model.consultationsOnly()
    t.model.onlyExisting()
    t.model.stripeReciever()
    t.model.stripePublicKey()
    t.model.stripePrivateKey()
    t.model.offlineMessage()
    t.model.disableLocations()
    t.model.theme()
    t.model.promoCodes()
    t.model.termsConditions()
    t.model.gaAnalytics()
    t.model.gtManager()
    t.model.fbCode()
    t.model.fbEvent()
    t.model.docSharedTemplate()
    t.model.classesEmailConfirm()
    t.model.sageVendor()
    t.model.sageUsername()
    t.model.sagePassword()
    t.model.gcPublicKey()
    t.model.gcPrivateKey()
    t.model.enableTitle()
    t.model.groupByRegion()
    t.model.useNewConnect()
    t.model.disableReviews()
    t.model.allowRating()
    t.model.showCatPhotos()
    t.model.classColumns()
    t.model.noVatPrices()
    t.model.integrationMethod()
    t.model.rollingDeposit()
    t.model.oneTouchBook()
    t.model.newStripe()
    t.model.enableMasterCat()
    t.model.stripeFee()
    t.model.reccuringSearchBtn()
    t.model.forceNewExistingPatient()
    t.model.redirectUrl()
    t.model.connectUrl()
  },
})

export const bookitProGeneralQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.bookitProGeneral()
    t.field('findFirstBookitProGeneral', {
      type: 'BookitProGeneral',
      args: {
        where: 'BookitProGeneralWhereInput',
        orderBy: arg({ type: 'BookitProGeneralOrderByInput' }),
        cursor: 'BookitProGeneralWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bookitProGeneral.findFirst(args as any)
      },
    })
    t.crud.bookitProGenerals({ filtering: true, ordering: true })
    t.field('bookitProGeneralsCount', {
      type: 'Int',
      args: {
        where: 'BookitProGeneralWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bookitProGeneral.count(args as any)
      },
    })
  },
})

export const bookitProGeneralMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBookitProGeneral()
    t.crud.updateOneBookitProGeneral()
    t.crud.upsertOneBookitProGeneral()
    t.crud.deleteOneBookitProGeneral()
    t.crud.updateManyBookitProGeneral()
    t.crud.deleteManyBookitProGeneral()
  },
})
