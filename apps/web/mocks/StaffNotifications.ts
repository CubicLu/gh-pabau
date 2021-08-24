export const notificationVariables = [
  {
    type: 'cancelled_appointment_via_pabau',
    variables: {
      who: 'John Smith',
      service_name: 'Chemical Peel',
      date: Intl.DateTimeFormat('en-US').format(new Date()),
      time: Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
      cancellation_reason: 'Staff member alex room is not available',
    },
  },
  {
    type: 'cancelled_appointment_via_calendar',
    variables: {
      who: 'Olivia Sanders',
      service_name: 'Chemical Peel',
      client_name: 'John Smith',
      date: Intl.DateTimeFormat('en-US').format(new Date()),
      time: Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
      cancellation_reason: 'Staff member not available',
    },
  },
  {
    type: 'rescheduled_appointment_via_calendar',
    variables: {
      who: 'John Smith',
      service_name: 'Chemical Peel',
      date: Intl.DateTimeFormat('en-US').format(new Date()),
      time: Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
      client_name: 'Joe Hickey',
    },
  },
  {
    type: 'rescheduled_appointment_via_pabau',
    variables: {
      who: 'Olivia Sanders',
      service_name: 'Chemical Peel',
      date: Intl.DateTimeFormat('en-US').format(new Date()),
      time: Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
    },
  },
  {
    type: 'new_appointment_via_calendar',
    variables: {
      who: 'Olivia Sanders',
      service_name: 'Chemical Peel',
      client_name: 'John Smith',
      date: Intl.DateTimeFormat('en-US').format(new Date()),
      time: Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
    },
  },
  {
    type: 'new_appointment_via_pabau',
    variables: {
      who: 'Olivia Sanders',
      service_name: 'Chemical Peel',
      date: Intl.DateTimeFormat('en-US').format(new Date()),
      time: Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
    },
  },
  {
    type: 'newsletter_campaign',
    variables: {
      campaign_name: 'New Newsletter',
    },
  },
  {
    type: 'client_arrived_for_appointment',
    variables: {
      client_name: 'John Smith',
      appointment_name: 'Chemical Peel',
    },
  },
  {
    type: 'bookout',
    variables: {
      staff_name: 'Olivia Sanders',
      staff_list: ['Brown', 'Williams', 'Jones'].join(','),
      date: Intl.DateTimeFormat('en-US').format(new Date()),
      time: Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date()),
      bookout_name: 'we have scheduled staff meeting',
    },
  },
  {
    type: 'holiday_request',
    variables: {
      staff_name: 'Olivia',
      surname: 'Sanders',
    },
  },
  {
    type: 'sms_campaign',
    variables: {
      campaign_name: 'New SMS',
    },
  },
  {
    type: 'report',
    variables: {
      report_category_name: 'Team Comission',
      report_name: 'Payroll',
    },
  },
  {
    type: 'new_lead',
    variables: {
      lead_name: 'New lead',
      treatment_interest: 'Botox',
    },
  },
  {
    type: 'inventory',
    variables: {
      staff_name: 'John Smith',
    },
  },
  {
    type: 'purchase_order_issued',
    variables: {
      staff_member: 'John Smith',
      purchase_order_number: '68975246',
      supplier_name: 'Olivia Sanders',
    },
  },
  {
    type: 'new_blog_post',
    variables: {
      someone: 'Olivia Sanders',
    },
  },
  {
    type: 'purchase_order_arrived',
    variables: {
      purchase_order_number: '875462251',
      staff_member: 'John Smith',
      purchase_order_date: Intl.DateTimeFormat('en-US').format(new Date()),
    },
  },
  {
    type: 'review',
    variables: {
      employee_name: 'John Smith',
      purchase_order_date: Intl.DateTimeFormat('en-US').format(new Date()),
    },
  },
  {
    type: 'lead_assigned',
    variables: {
      lead_name: 'lead name',
      who: 'Olivia Sanders',
    },
  },
]
