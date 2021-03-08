import { objectType, arg, extendType } from 'nexus'

export const BookingSetting = objectType({
  name: 'BookingSetting',
  definition(t) {
    t.model.id()
    t.model.occupier()
    t.model.emailMode()
    t.model.smsMode()
    t.model.emailId()
    t.model.emailConfirmId()
    t.model.smsId()
    t.model.emailReminderId()
    t.model.autoCal()
    t.model.autoEmail()
    t.model.autoSms()
    t.model.autoCon()
    t.model.feedbackMode()
    t.model.feedbackId()
    t.model.smsName()
    t.model.feedbackDaysAfter()
    t.model.feedbackSendTime()
    t.model.reminderMode()
    t.model.daysBefore()
    t.model.sendTime()
    t.model.smsDaysBefore()
    t.model.smsSendTime()
    t.model.classSmsDaysBefore()
    t.model.classSmsSendTime()
    t.model.roomSupport()
    t.model.feedbackFromemail()
    t.model.confirmFromemail()
    t.model.smsFrom()
    t.model.reminderFromemail()
    t.model.sendSms()
    t.model.sendEmail()
    t.model.sendReminder()
    t.model.sendFeedback()
    t.model.attachInvoice()
    t.model.startTime()
    t.model.endTime()
    t.model.bookingEmails()
    t.model.slotInterval()
    t.model.fontColor()
    t.model.disableSecondCal()
    t.model.fontSize()
    t.model.disableTime()
    t.model.lockTimer()
    t.model.disableSurname()
    t.model.arrivedColor()
    t.model.completeColor()
    t.model.cancelSmsNotify()
    t.model.cancelEmailNotify()
    t.model.rescheduleSmsNotify()
    t.model.rescheduleEmailNotify()
    t.model.noshowEmailNotify()
    t.model.classNoshowEmailNotify()
    t.model.classRescheduleEmailNotify()
    t.model.classReminderEmailNotify()
    t.model.classNoshowSmsNotify()
    t.model.classRescheduleSmsNotify()
    t.model.classReminderSmsNotify()
    t.model.noshowSmsNotify()
    t.model.locationSupport()
    t.model.noshowCount()
    t.model.rescheduleSmsFrom()
    t.model.rescheduleSmsTmpl()
    t.model.rescheduleEmailFrom()
    t.model.rescheduleEmailTmpl()
    t.model.cancelSmsFrom()
    t.model.cancelSmsTmpl()
    t.model.cancelEmailFrom()
    t.model.cancelEmailTmpl()
    t.model.smsConfirmId()
    t.model.noshowEmailFrom()
    t.model.noshowEmailTmpl()
    t.model.classNoshowEmailTmpl()
    t.model.classRescheduleEmailTmpl()
    t.model.classReminderEmailTmpl()
    t.model.classNoshowSmsTmpl()
    t.model.classRescheduleSmsTmpl()
    t.model.classReminderSmsTmpl()
    t.model.noshowSmsFrom()
    t.model.noshowSmsTmpl()
    t.model.columnTotal()
    t.model.tooltipHead()
    t.model.tooltipBody()
    t.model.apptHead()
    t.model.apptBody()
    t.model.holidayResetDate()
    t.model.holidayUsualDay()
    t.model.holidayPerMonth()
    t.model.holidayDefault()
    t.model.groupBookingChangeEmailEnable()
    t.model.groupBookingChangeTemplateId()
    t.model.groupBookingCancelEmailEnable()
    t.model.groupBookingCancelTemplateId()
    t.model.packageUsedEmailEnable()
    t.model.packageUsedTemplateId()
    t.model.disableIcs()
    t.model.initials()
    t.model.disableServiceFilter()
    t.model.disableBookByPackage()
    t.model.allowOverlappingAppts()
    t.model.modifiedBy()
    t.model.modifiedDate()
    t.model.conferenceReminderId()
  },
})

export const bookingSettingQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.bookingSetting()
    t.field('findFirstBookingSetting', {
      type: 'BookingSetting',
      args: {
        where: 'BookingSettingWhereInput',
        orderBy: arg({ type: 'BookingSettingOrderByInput' }),
        cursor: 'BookingSettingWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bookingSetting.findFirst(args as any)
      },
    })
    t.crud.bookingSettings({ filtering: true, ordering: true })
    t.field('bookingSettingsCount', {
      type: 'Int',
      args: {
        where: 'BookingSettingWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bookingSetting.count(args as any)
      },
    })
  },
})

export const bookingSettingMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBookingSetting()
    t.crud.updateOneBookingSetting()
    t.crud.upsertOneBookingSetting()
    t.crud.deleteOneBookingSetting()
    t.crud.updateManyBookingSetting()
    t.crud.deleteManyBookingSetting()
  },
})
