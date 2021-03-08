import { objectType, arg, extendType } from 'nexus'

export const CompanySubscription = objectType({
  name: 'CompanySubscription',
  definition(t) {
    t.model.licenseId()
    t.model.companyId()
    t.model.company()
    t.model.licenseType()
    t.model.licenseExpiry()
    t.model.active()
    t.model.code()
    t.model.maxUserCount()
    t.model.uid()
    t.model.suspendSms()
    t.model.smsRate()
    t.model.setupStage()
    t.model.disableSms()
    t.model.paymentId()
    t.model.warningLevel()
    t.model.subscriptionName()
    t.model.subscriptionFee()
    t.model.suspendedOn()
    t.model.demoAccount()
    t.model.suspensionReason()
    t.model.pabauScore()
    t.model.gcEmail()
    t.model.paymentBounces()
    t.model.trainingStatus()
    t.model.setupStatus()
    t.model.orderSheet()
    t.model.completeAccount()
    t.model.completeNotes()
    t.model.detailsStatus()
    t.model.trainingDate()
    t.model.billCycle()
    t.model.renewInterval()
    t.model.excludeReports()
    t.model.subStartDate()
    t.model.priceRange()
    t.model.stripeCustomerId()
    t.model.stripeSubscriptionId()
    t.model.trial()
    t.model.storage()
    t.model.freeUsers()
    t.model.gcCustomerId()
    t.model.lowCreditAmount()
    t.model.lowSmsAction()
    t.model.activityLogs()
    t.model.accountLive()
    t.model.discount()
    t.model.gcPlanId()
    t.model.supportPlan()
    t.model.supportFee()
    t.model.gcSupportPlanId()
    t.model.enterpriseUserCost()
    t.model.gcEnterprisePlanId()
    t.model.enterpriseFee()
    t.model.gcAmount()
    t.model.leaveAlert()
    t.model.stripeFee()
    t.model.stripeFeeType()
    t.model.previousSystem()
    t.model.amGroup()
    t.model.phoneSupport()
    t.model.slackSupport()
    t.model.whatsappSupport()
    t.model.multipleLocations()
    t.model.commissionRate()
    t.model.liveServer()
    t.model.sandboxServer()
    t.model.serverCompId()
    t.model.partnerId()
    t.model.advancedMarketingAddon()
    t.model.freeMonths()
    t.model.hideInComps()
    t.model.amStartDate()
    t.model.trainerId()
    t.model.onboarderId()
    t.model.isReferral()
  },
})

export const companySubscriptionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companySubscription()
    t.field('findFirstCompanySubscription', {
      type: 'CompanySubscription',
      args: {
        where: 'CompanySubscriptionWhereInput',
        orderBy: arg({ type: 'CompanySubscriptionOrderByInput' }),
        cursor: 'CompanySubscriptionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companySubscription.findFirst(args as any)
      },
    })
    t.crud.companySubscriptions({ filtering: true, ordering: true })
    t.field('companySubscriptionsCount', {
      type: 'Int',
      args: {
        where: 'CompanySubscriptionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companySubscription.count(args as any)
      },
    })
  },
})

export const companySubscriptionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanySubscription()
    t.crud.updateOneCompanySubscription()
    t.crud.upsertOneCompanySubscription()
    t.crud.deleteOneCompanySubscription()
    t.crud.updateManyCompanySubscription()
    t.crud.deleteManyCompanySubscription()
  },
})
