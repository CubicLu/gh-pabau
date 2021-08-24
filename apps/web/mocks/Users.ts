export function useData(t) {
  const columns = [
    {
      key: 'owner',
      title: t('team.user.permission.column.owner'),
      staffMember: [],
      isDisabled: true,
    },
  ]

  const staff_meta_keys = [
    'staff_disable_edit_invoice_content',
    'staff_disable_edit_invoices',
    'medical_approval_notes',
    'can_edit_stock_descriptions',
    'can_edit_stock_level',
  ]

  const field_type_number = [
    'hide_calendar',
    'hide_online_bookings',
    'can_edit_booking_time',
    'performance_stats',
    'can_discount',
  ]

  const invert_fields = [
    'hide_calendar',
    'hide_online_bookings',
    'InvBiller',
    'staff_disable_edit_invoices',
  ]

  const loaderColumns = []
  for (let i = 0; i < 5; i = i + 1) {
    loaderColumns.push({
      key: i,
      title: '',
    })
  }

  const loaderDatasource = []
  for (let i = 0; i < 5; i = i + 1) {
    loaderDatasource.push({
      key: i,
      name: '',
      permissions: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
    })
  }

  const moduleTabData = {
    dataSource: [
      {
        key: 'contacts',
        name: t('team.user.module.source.contacts.title'),
        children: [
          {
            key: 'Contact Manager',
            name: t('team.user.module.source.clients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.clients.tooltip'),
          },
          {
            key: 'Case Manager',
            name: t('team.user.module.source.cases'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.cases.tooltip'),
          },
          {
            key: 'Lab Requests',
            name: t('team.user.module.source.lab.requests'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.lab.requests.tooltip'),
          },
        ],
      },
      {
        key: 'finance',
        name: t('team.user.module.source.finance.title'),
        children: [
          {
            key: 'Accounts',
            name: t('team.user.module.source.accounts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.accounts.tooltip'),
          },
          {
            key: 'Cashup',
            name: t('team.user.module.source.cashup'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.cashup.tooltip'),
          },
          {
            key: 'Expenses',
            name: t('team.user.module.source.expenses'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.expenses.tooltip'),
          },
        ],
      },
      {
        key: 'leads',
        name: t('team.user.module.source.leads.title'),
        children: [
          {
            key: 'Lead Manager',
            name: t('team.user.module.source.leads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.leads.tooltip'),
          },
        ],
      },
      {
        key: 'marketing',
        name: t('team.user.module.source.marketing.title'),
        children: [
          {
            key: 'SMS Campaign',
            name: t('team.user.module.source.campaigns'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.campaigns.tooltip'),
          },
          {
            key: 'Social Survey',
            name: t('team.user.module.source.reviews'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.reviews.tooltip'),
          },
          {
            key: 'Gift Vouchers',
            name: t('team.user.module.source.gift.vouchers'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.gift.vouchers.tooltip'),
          },
          {
            key: 'Referral Tracker',
            name: t('team.user.module.source.referral'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.referral.tooltip'),
          },
          {
            key: 'Loyalty',
            name: t('team.user.module.source.loyalty'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.loyalty.tooltip'),
          },
        ],
      },
      {
        key: 'Reports',
        name: t('team.user.module.source.reports.title'),
        permissions: {
          owner: true,
        },
      },
      {
        key: 'stock',
        name: t('team.user.module.source.stock.title'),
        children: [
          {
            key: 'Products',
            name: t('team.user.module.source.products'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.products.tooltip'),
          },
          {
            key: 'Inventory Count',
            name: t('team.user.module.source.inventory.count'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.module.source.inventory.count.tooltip'
            ),
          },
          {
            key: 'Purchase Order',
            name: t('team.user.module.source.purchase.order'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.purchase.order.tooltip'),
          },
          {
            key: 'Suppliers',
            name: t('team.user.module.source.supplier'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.supplier.tooltip'),
          },
        ],
      },
      {
        key: 'Practice',
        name: t('team.user.module.source.calendar.title'),
        permissions: {
          owner: true,
        },
      },
      {
        key: 'staff',
        name: t('team.user.module.source.team.title'),
        children: [
          {
            key: 'Staff Manager',
            name: t('team.user.module.source.teammates'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.teammates.tooltip'),
          },
          {
            key: 'Staff Targets',
            name: t('team.user.module.source.targets'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.targets.tooltip'),
          },
          {
            key: 'Staff Rota',
            name: t('team.user.module.source.schedule'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.schedule.tooltip'),
          },
          {
            key: 'STK015',
            name: t('team.user.module.source.hiring'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.hiring.tooltip'),
          },
          {
            key: 'STK015',
            name: t('team.user.module.source.commissions'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.commissions.tooltip'),
          },
        ],
      },
    ],
  }

  const featureTabData = {
    dataSource: [
      {
        key: '1',
        name: t('team.user.feature.source.calendar.clients.title'),
        children: [
          {
            key: 'hide_calendar',
            name: t('team.user.feature.source.available.calendar'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.available.calendar.tooltip'
            ),
          },
          {
            key: 'can_view_full_cal',
            name: t('team.user.feature.source.view.everybody.calendar'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.view.everybody.calendar.tooltip'
            ),
          },
          {
            key: 'can_make_blockout',
            name: t('team.user.feature.source.can.make.bookout'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.make.bookout.tooltip'
            ),
          },
          {
            key: 'hide_online_bookings',
            name: t('team.user.feature.source.bookable.online'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.bookable.online.tooltip'
            ),
          },
          {
            key: 'can_cancel_booking',
            name: t('team.user.feature.source.can.cancel.booking'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.cancel.booking.tooltip'
            ),
          },
          {
            key: 'can_edit_booking_time',
            name: t('team.user.feature.source.change.booking.time'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.change.booking.time.tooltip'
            ),
          },
          {
            key: 'can_move_blockout',
            name: t('team.user.feature.source.can.move.blockout'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.move.blockout.tooltip'
            ),
          },
          {
            key: 'can_delete_blockout',
            name: t('team.user.feature.source.can.delete.blockout'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.delete.blockout.tooltip'
            ),
          },
        ],
      },
      {
        key: '2',
        name: t('team.user.feature.source.financials.title'),
        children: [
          {
            key: 'can_void',
            name: t('team.user.feature.source.can.void.sales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.void.sales.tooltip'
            ),
          },
          {
            key: 'can_refund',
            name: t('team.user.feature.source.can.refund.sales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.refund.sales.tooltip'
            ),
          },
          {
            key: 'staff_disable_edit_invoice_content',
            name: t('team.user.feature.source.can.edit.invoice.content'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.edit.invoice.content.tooltip'
            ),
          },
          {
            key: 'InvBiller',
            name: t('team.user.feature.source.available.to.sell'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.available.to.sell.tooltip'
            ),
          },
          {
            key: 'staff_disable_edit_invoices',
            name: t('team.user.feature.source.can.edit.invoices'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.edit.invoices.tooltip'
            ),
          },
          {
            key: 'performance_stats',
            name: t('team.user.feature.source.performance.stats'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.performance.stats.tooltip'
            ),
          },
          {
            key: 'can_discount_single',
            name: t('team.user.feature.source.apply.discount'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.apply.discount.tooltip'
            ),
          },
        ],
      },
      {
        key: '3',
        name: t('team.user.feature.source.other.title'),
        children: [
          {
            key: 'delete_alert_notes',
            name: t('team.user.feature.source.can.delete.alert.notes'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.delete.alert.notes.tooltip'
            ),
          },
          {
            key: 'delete_treatment',
            name: t('team.user.feature.source.edit.delete.EMR'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.edit.delete.EMR.tooltip'
            ),
          },
          {
            key: 'can_merge',
            name: t('team.user.feature.source.merge.duplicate.contrast'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.merge.duplicate.contrast.tooltip'
            ),
          },
          {
            key: 'can_report',
            name: t('team.user.feature.source.appear.on.reports'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.appear.on.reports.tooltip'
            ),
          },
          {
            key: 'can_rota',
            name: t('team.user.feature.source.can.manage.rota'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.manage.rota.tooltip'
            ),
          },
          {
            key: 'appear_on_rota',
            name: t('team.user.feature.source.appear.on.rota'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.appear.on.rota.tooltip'
            ),
          },
          {
            key: 'medical_approval_notes',
            name: t('team.user.feature.source.medical.approval.notes'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.medical.approval.notes.tooltip'
            ),
          },
          {
            key: 'can_edit_stock_descriptions',
            name: t('team.user.feature.source.can.edit.stock.descriptions'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.edit.stock.descriptions.tooltip'
            ),
          },
          {
            key: 'can_edit_stock_level',
            name: t('team.user.feature.source.can.edit.stock.level'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.can.edit.stock.level.tooltip'
            ),
          },
        ],
      },
    ],
  }

  const reportsTabData = {
    dataSource: [
      {
        key: '1',
        name: t('team.user.reports.source.contact.reports.title'),
        children: [
          {
            key: 'CO001',
            name: t('team.user.reports.source.basic.information'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.basic.information.tooltip'
            ),
          },
          {
            key: 'CO003',
            name: t('team.user.reports.source.birthday'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.birthday.tooltip'),
          },
          {
            key: 'CO010',
            name: t('team.user.reports.source.outstanding.packages'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.outstanding.packages.tooltip'
            ),
          },
          {
            key: 'CO020',
            name: t('team.user.reports.source.new.clients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.new.clients.tooltip'),
          },
          {
            key: 'CO030',
            name: t('team.user.reports.source.last.spend'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.last.spend.tooltip'),
          },
          {
            key: 'CO031',
            name: t('team.user.reports.source.last.visit'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.last.visit.tooltip'),
          },
          {
            key: 'CO035',
            name: t('team.user.reports.source.clients.by.location'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clients.by.location.tooltip'
            ),
          },
          {
            key: 'CO046',
            name: t('team.user.reports.source.first.visit'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.first.visit.tooltip'),
          },
          {
            key: 'VA001',
            name: t('team.user.reports.source.vaccination.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.vaccination.report.tooltip'
            ),
          },
          {
            key: 'CO045',
            name: t('team.user.reports.source.big.spender.receipt'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.big.spender.receipt.tooltip'
            ),
          },
          {
            key: 'CO050',
            name: t('team.user.reports.source.client.receipts.category'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.client.receipts.category.tooltip'
            ),
          },
          {
            key: 'CO065',
            name: t('team.user.reports.source.client.retail.purchases'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.client.retail.purchases.tooltip'
            ),
          },
          {
            key: 'CO070',
            name: t('team.user.reports.source.account.balance'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.account.balance.tooltip'
            ),
          },
          {
            key: 'CO075',
            name: t('team.user.reports.source.client.service.sales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.client.service.sales.tooltip'
            ),
          },
          {
            key: 'CO147',
            name: t('team.user.reports.source.medical.data.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.medical.data.report.tooltip'
            ),
          },
          {
            key: 'CO060',
            name: t('team.user.reports.source.duplicate.clients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.duplicate.clients.tooltip'
            ),
          },
          {
            key: 'CO105',
            name: t('team.user.reports.source.patient.prescriptions'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.patient.prescriptions.tooltip'
            ),
          },
          {
            key: 'CO110',
            name: t('team.user.reports.source.clients.treatment.interest'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clients.treatment.interest.tooltip'
            ),
          },
          {
            key: 'CO111',
            name: t('team.user.reports.source.never.purchased.before'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.never.purchased.before.tooltip'
            ),
          },
          {
            key: 'CO115',
            name: t('team.user.reports.source.client.enquiry.conversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.client.enquiry.conversion.tooltip'
            ),
          },
          {
            key: 'CO130',
            name: t('team.user.reports.source.product.consumption'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.product.consumption.tooltip'
            ),
          },
          {
            key: 'CO135',
            name: t('team.user.reports.source.account.activity'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.account.activity.tooltip'
            ),
          },
          {
            key: 'CO140',
            name: t('team.user.reports.source.last.customer.bookings.employee'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.last.customer.bookings.employee.tooltip'
            ),
          },
          {
            key: 'CO145',
            name: t('team.user.reports.source.account.balance.date'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.account.balance.date.tooltip'
            ),
          },
          {
            key: 'CO146',
            name: t('team.user.reports.source.treatment.missing.data'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.treatment.missing.data.tooltip'
            ),
          },
        ],
      },
      {
        key: '2',
        name: t('team.user.reports.source.marketing.reports.title'),
        children: [
          {
            key: 'CO095',
            name: t('team.user.reports.source.client.recalls'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.client.recalls.tooltip'
            ),
          },
          {
            key: 'CO100',
            name: t('team.user.reports.source.loyalty.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.loyalty.report.tooltip'
            ),
          },
          {
            key: 'CO085',
            name: t('team.user.reports.source.gift.cards'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.gift.cards.tooltip'),
          },
          {
            key: 'CO090',
            name: t('team.user.reports.source.gift.card.analysis'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.gift.card.analysis.tooltip'
            ),
          },
          {
            key: 'MA001',
            name: t('team.user.reports.source.sales.referral.source'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.sales.referral.source.tooltip'
            ),
          },
          {
            key: 'MA005',
            name: t('team.user.reports.source.opt.text.contacts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.opt.text.contacts.tooltip'
            ),
          },
          {
            key: 'MA010',
            name: t('team.user.reports.source.opt.email.contacts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.opt.email.contacts.tooltip'
            ),
          },
          {
            key: 'MA020',
            name: t('team.user.reports.source.referral.sources'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.referral.sources.tooltip'
            ),
          },
          {
            key: 'MA025',
            name: t('team.user.reports.source.feedback.results'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.feedback.results.tooltip'
            ),
          },
          {
            key: 'MA030',
            name: t('team.user.reports.source.survey.feedback'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.survey.feedback.tooltip'
            ),
          },
        ],
      },
      {
        key: '3',
        name: t('team.user.reports.source.finance.reports.title'),
        children: [
          {
            key: 'FI000',
            name: t('team.user.reports.source.daily.sales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.daily.sales.tooltip'),
          },
          {
            key: 'FI001',
            name: t('team.user.reports.source.daily.reconciliation'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.daily.reconciliation.tooltip'
            ),
          },
          {
            key: 'FI002',
            name: t('team.user.reports.source.daily.payments'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.daily.payments.tooltip'
            ),
          },
          {
            key: 'FI005',
            name: t('team.user.reports.source.receipts.employee'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.employee.tooltip'
            ),
          },
          {
            key: 'FI006',
            name: t('team.user.reports.source.sales.employee'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.sales.employee.tooltip'
            ),
          },
          {
            key: 'FI010',
            name: t('team.user.reports.source.receipts.retail'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.retail.tooltip'
            ),
          },
          {
            key: 'FI011',
            name: t('team.user.reports.source.receipts.service'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.service.tooltip'
            ),
          },
          {
            key: 'FI012',
            name: t('team.user.reports.source.receipts.category'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.category.tooltip'
            ),
          },
          {
            key: 'FI014',
            name: t('team.user.reports.source.sales.category'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.sales.category.tooltip'
            ),
          },
          {
            key: 'FI015',
            name: t('team.user.reports.source.receipts.employee.service'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.employee.service.tooltip'
            ),
          },
          {
            key: 'FI016',
            name: t('team.user.reports.source.receipts.employee.retail'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.employee.retail.tooltip'
            ),
          },
          {
            key: 'FI019',
            name: t('team.user.reports.source.VAT.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.VAT.report.tooltip'),
          },
          {
            key: 'FI025',
            name: t('team.user.reports.source.receipts.month'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.month.tooltip'
            ),
          },
          {
            key: 'FI026',
            name: t('team.user.reports.source.monthly.taking.summary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.monthly.taking.summary.tooltip'
            ),
          },
          {
            key: 'FI030',
            name: t('team.user.reports.source.raised.invoices'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.raised.invoices.tooltip'
            ),
          },
          {
            key: 'FI040',
            name: t('team.user.reports.source.expenses'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.expenses.tooltip'),
          },
          {
            key: 'FI075',
            name: t('team.user.reports.source.outstanding.invoices'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.outstanding.invoices.tooltip'
            ),
          },
          {
            key: 'FI085',
            name: t('team.user.reports.source.service.retail.receipts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.service.retail.receipts.tooltip'
            ),
          },
          {
            key: 'FI090',
            name: t('team.user.reports.source.aged.insurance.debt.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.aged.insurance.debt.report.tooltip'
            ),
          },
          {
            key: 'FI017',
            name: t('team.user.reports.source.receipts.employee.detailed'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipt.employee.detailed.tooltip'
            ),
          },
          {
            key: 'FI022',
            name: t('team.user.reports.source.daily.performance.stats'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.daily.performance.stats.tooltip'
            ),
          },
          {
            key: 'FI031',
            name: t('team.user.reports.source.invoice.activity'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.invoice.activity.tooltip'
            ),
          },
          {
            key: 'FI035',
            name: t('team.user.reports.source.receipts.payment.method'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receipts.payment.method.tooltip'
            ),
          },
          {
            key: 'FI055',
            name: t('team.user.reports.source.unpaid.visits'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.unpaid.visits.tooltip'),
          },
          {
            key: 'FI060',
            name: t('team.user.reports.source.free.giveaways'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.free.giveaways.tooltip'
            ),
          },
          {
            key: 'FI065',
            name: t('team.user.reports.source.appointment.income.projection'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.appointment.income.projection.tooltip'
            ),
          },
          {
            key: 'FI070',
            name: t('team.user.reports.source.discount.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.discount.report.tooltip'
            ),
          },
          {
            key: 'FI080',
            name: t('team.user.reports.source.sales.expense'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.sales.expense.tooltip'),
          },
          {
            key: 'FI155',
            name: t('team.user.reports.source.insurance.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.insurance.report.tooltip'
            ),
          },
          {
            key: 'OT001',
            name: t('team.user.reports.source.sales.conversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.sales.conversion.tooltip'
            ),
          },
          {
            key: 'OT002',
            name: t('team.user.reports.source.telesales.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.telesales.report.tooltip'
            ),
          },
        ],
      },
      {
        key: '4',
        name: t('team.user.reports.source.lead.reports.title'),
        children: [
          {
            key: 'LE000',
            name: t('team.user.reports.source.open.leads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.open.leads.tooltip'),
          },
          {
            key: 'LE001',
            name: t('team.user.reports.source.converted.leads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.converted.leads.tooltip'
            ),
          },
          {
            key: 'LE005',
            name: t('team.user.reports.source.leads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leads.tooltip'),
          },
          {
            key: 'LE015',
            name: t('team.user.reports.source.leads.status'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leads.status.tooltip'),
          },
          {
            key: 'LE020',
            name: t('team.user.reports.source.leads.sources'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leads.sources.tooltip'),
          },
          {
            key: 'LE035',
            name: t('team.user.reports.source.leads.interest'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.leads.interest.tooltip'
            ),
          },
          {
            key: 'LE040',
            name: t('team.user.reports.source.leads.clinic'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leads.clinic.tooltip'),
          },
        ],
      },
      {
        key: '5',
        name: t('team.user.reports.source.appointments.title'),
        children: [
          {
            key: 'CO021',
            name: t('team.user.reports.source.booked.appointments'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.booked.appointments.tooltip'
            ),
          },
          {
            key: 'CO025',
            name: t('team.user.reports.source.missed.cancelled.appointments'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.missed.cancelled.appointments.tooltip'
            ),
          },
          {
            key: 'CO036',
            name: t('team.user.reports.source.connect.registration.bookings'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.connect.registration.bookings.tooltip'
            ),
          },
          {
            key: 'CO040',
            name: t('team.user.reports.source.consultation.conversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.consultation.conversion.tooltip'
            ),
          },
          {
            key: 'CO006',
            name: t('team.user.reports.source.appointments.service.type.count'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.appointments.service.type.count.tooltip'
            ),
          },
          {
            key: 'CO125',
            name: t('team.user.reports.source.surgery.preparations'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.surgery.preparations.tooltip'
            ),
          },
          {
            key: 'CO140',
            name: t(
              'team.user.reports.source.last.customer.bookings.by.employee'
            ),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.last.customer.bookings.by.employee.tooltip'
            ),
          },
          {
            key: 'ST000',
            name: t('team.user.reports.source.staff.appointment.schedule'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staff.appointment.schedule.tooltip'
            ),
          },
          {
            key: 'ST025',
            name: t(
              'team.user.reports.source.st025.employee.appointment.summary'
            ),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.st025.employee.appointment.summary.tooltip'
            ),
          },
          {
            key: 'CO089',
            name: t('team.user.reports.source.locations.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.locations.report.tooltip'
            ),
          },
          {
            key: 'OT003',
            name: t('team.user.reports.source.classes.appointments.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.classes.appointments.report.tooltip'
            ),
          },
          {
            key: 'OT014',
            name: t('team.user.reports.source.room.utilization'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.room.utilization.tooltip'
            ),
          },
          {
            key: 'OT009',
            name: t('team.user.reports.source.clinic.conversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clinic.conversion.tooltip'
            ),
          },
        ],
      },
      {
        key: '6',
        name: t('team.user.reports.source.stock.reports.title'),
        children: [
          {
            key: 'STK001',
            name: t('team.user.reports.source.stock.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.stock.report.tooltip'),
          },
          {
            key: 'STK005',
            name: t('team.user.reports.source.low.stock'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.low.stock.tooltip'),
          },
          {
            key: 'STK015',
            name: t('team.user.reports.source.cost.goods'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.cost.goods.tooltip'),
          },
          {
            key: 'STK025',
            name: t('team.user.reports.source.stock.count'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.stock.count.tooltip'),
          },
        ],
      },
      {
        key: '7',
        name: t('team.user.reports.source.staff.reports.title'),
        children: [
          {
            key: 'ADV001',
            name: t('team.user.reports.source.team.reports'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.team.reports.tooltip'),
          },
          {
            key: 'ST078',
            name: t('team.user.reports.source.staff.bookouts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staff.bookouts.tooltip'
            ),
          },
          {
            key: 'ST001',
            name: t('team.user.reports.source.staff.performance.summary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staff.performance.summary.tooltip'
            ),
          },
          {
            key: 'ST002',
            name: t('team.user.reports.source.commission.summary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.commission.summary.tooltip'
            ),
          },
          {
            key: 'ST003',
            name: t('team.user.reports.source.commission.report.retail'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.commission.report.retail.tooltip'
            ),
          },
          {
            key: 'ST004',
            name: t('team.user.reports.source.staff.performance.tracker'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staff.performance.tracker.tooltip'
            ),
          },
          {
            key: 'ST005',
            name: t('team.user.reports.source.employee.holidays.date'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.employee.holidays.date.tooltip'
            ),
          },
          {
            key: 'ST015',
            name: t('team.user.reports.source.staff.hours'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.staff.hours.tooltip'),
          },
          {
            key: 'ST025',
            name: t('team.user.reports.source.employee.appointment.summary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.employee.appointment.summary.tooltip'
            ),
          },
          {
            key: 'ST031',
            name: t('team.user.reports.source.daily.employee.stats.summary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.daily.employee.stats.summary.tooltip'
            ),
          },
          {
            key: 'ST033',
            name: t('team.user.reports.source.daily.employee.stats'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.daily.employee.stats.tooltip'
            ),
          },
          {
            key: 'ST035',
            name: t('team.user.reports.source.staff.days.off'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staff.days.off.tooltip'
            ),
          },
          {
            key: 'ST036',
            name: t('team.user.reports.source.staff.payroll.report'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staff.payroll.report.tooltip'
            ),
          },
          {
            key: 'ST037',
            name: t('team.user.reports.source.staff.clock.in.out'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staff.clock,in.out.tooltip'
            ),
          },
        ],
      },
      {
        key: 'custom_report',
        name: t('team.user.reports.source.custom.reports.title'),
        children: [],
      },
    ],
  }

  const advancedTabData = {
    dataSource: [
      {
        key: '1',
        name: t('team.user.advanced.source.advanced.permissions.title'),
        children: [
          {
            key: 'CO001',
            name: t('team.user.advanced.source.restrict.to.clients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.restrict.to.clients.tooltip'
            ),
          },
          {
            key: 'CO003',
            name: t('team.user.advanced.source.restrict.data.user'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.restrict.data.user.tooltip'
            ),
          },
          {
            key: 'CO010',
            name: t('team.user.advanced.source.restrict.calendar.user'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.restrict.calendar.user.tooltip'
            ),
          },
          {
            key: 'CO020',
            name: t('team.user.advanced.source.limit.contact.location'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.limit.contact.location.tooltip'
            ),
          },
        ],
      },
    ],
  }

  return {
    advancedTabData,
    featureTabData,
    moduleTabData,
    reportsTabData,
    columns,
    staff_meta_keys,
    field_type_number,
    loaderDatasource,
    loaderColumns,
    invert_fields,
  }
}
