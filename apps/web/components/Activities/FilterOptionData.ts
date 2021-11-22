export const getData = (t) => {
  const activity = [
    {
      key: 'Activity',
      label: t('create.filter.modal.activity.option.label'),
    },
    {
      key: 'Lead',
      label: t('create.filter.modal.lead.option.label'),
    },
  ]

  const activityItemNames = [
    {
      key: 'Add time',
      label: t('create.filter.modal.activity.column.add.time'),
    },
    {
      key: 'Assigned to user',
      label: t('create.filter.modal.activity.column.assigned.user'),
    },
    {
      key: 'Client name',
      label: t('create.filter.modal.activity.column.client'),
    },
    {
      key: 'Creator',
      label: t('create.filter.modal.activity.column.creator'),
    },
    {
      key: 'Lead name',
      label: t('create.filter.modal.activity.column.lead'),
    },
    {
      key: 'Done',
      label: t('create.filter.modal.activity.column.done'),
    },
    {
      key: 'Type',
      label: t('create.filter.modal.activity.column.type'),
    },
    {
      key: 'Subject',
      label: t('create.filter.modal.activity.column.subject'),
    },
    {
      key: 'Due date',
      label: t('create.filter.modal.activity.column.dueDate'),
    },
    {
      key: 'Free/busy',
      label: t('create.filter.modal.activity.column.free.busy'),
    },
    {
      key: 'Status',
      label: t('create.filter.modal.activity.column.status'),
    },
  ]

  const leadItemNames = [
    {
      key: 'Lead name',
      label: t('create.filter.modal.lead.column.lead.name'),
    },
    {
      key: 'Lead email',
      label: t('create.filter.modal.lead.column.lead.email'),
    },
    {
      key: 'Lead phone',
      label: t('create.filter.modal.lead.column.lead.phone'),
    },
    {
      key: 'Lead created date',
      label: t('create.filter.modal.lead.column.lead.createdDate'),
    },
    {
      key: 'Won time',
      label: t('create.filter.modal.lead.column.lead.won.time'),
    },
    {
      key: 'Lead owner',
      label: t('create.filter.modal.lead.column.lead.owner'),
    },
    {
      key: 'Lead closed on',
      label: t('create.filter.modal.lead.column.lead.closed.on'),
    },
    {
      key: 'Lead done activities',
      label: t('create.filter.modal.lead.column.lead.done.activities'),
    },
    {
      key: 'First activity time',
      label: t('create.filter.modal.lead.column.lead.first.activity.time'),
    },
    {
      key: 'Lead last activity date',
      label: t('create.filter.modal.lead.column.lead.last.activity.date'),
    },
    {
      key: 'Lead last activity (days)',
      label: t('create.filter.modal.lead.column.lead.last.activity.days'),
    },
    {
      key: 'Lead lost reason',
      label: t('create.filter.modal.lead.column.lead.lost.reason'),
    },
    {
      key: 'Lead total activities',
      label: t('create.filter.modal.lead.column.lead.total.activities'),
    },
    {
      key: 'Lead lost time',
      label: t('create.filter.modal.lead.column.lead.lost.time'),
    },
    {
      key: 'Lead source',
      label: t('create.filter.modal.lead.column.lead.source'),
    },
    {
      key: 'Won by',
      label: t('create.filter.modal.lead.column.lead.won.by'),
    },
    {
      key: 'Lead stage',
      label: t('create.filter.modal.lead.column.lead.stage'),
    },
    // {
    //   key: 'Lead descriptions',
    //   label: t('create.filter.modal.lead.column.lead.descriptions'),
    // },
    {
      key: 'Lead status',
      label: t('create.filter.modal.lead.column.lead.status'),
    },
    {
      key: 'Activities to do',
      label: t('create.filter.modal.lead.column.lead.activity.to.do'),
    },
    {
      key: 'Lead creator',
      label: t('create.filter.modal.lead.column.lead.creator'),
    },
    {
      key: 'Date of entering stage',
      label: t('create.filter.modal.lead.column.lead.date.entring.stage'),
    },
    {
      key: 'Email messages count',
      label: t('create.filter.modal.lead.column.lead.email.messages.stage'),
    },
    {
      key: 'Last email received',
      label: t(
        'create.filter.modal.lead.column.lead.last.email.received.stage'
      ),
    },
    {
      key: 'Last email sent',
      label: t('create.filter.modal.lead.column.lead.last.email.sent'),
      disable: true,
      tag: t('create.filter.modal.lead.column.soon.feature.tag'),
    },
    {
      key: 'Next activity date',
      label: t('create.filter.modal.lead.column.lead.next.activity.date'),
    },
    {
      key: 'Pipeline',
      label: t('create.filter.modal.lead.column.lead.pipeline'),
    },
    {
      key: 'Title',
      label: t('create.filter.modal.lead.column.lead.title'),
    },
    {
      key: 'Update time',
      label: t('create.filter.modal.lead.column.lead.update.time'),
    },
    {
      key: 'Location',
      label: t('create.filter.modal.lead.column.lead.location'),
    },
  ]

  const activityTypeMapper = {
    Activity: activityItemNames,
    Lead: leadItemNames,
  }

  const basicOperands = [
    {
      key: 'is',
      label: t('create.filter.modal.date.is.operand'),
    },
    {
      key: 'is not',
      label: t('create.filter.modal.date.is.not.operand'),
    },
    {
      key: 'is empty',
      label: t('create.filter.modal.date.is.empty.operand'),
    },
    {
      key: 'is not empty',
      label: t('create.filter.modal.date.is.not.empty.operand'),
    },
  ]

  const dateOperands = [
    {
      key: 'is',
      label: t('create.filter.modal.date.is.operand'),
    },
    {
      key: 'is not',
      label: t('create.filter.modal.date.is.not.operand'),
    },
    {
      key: 'is later than',
      label: t('create.filter.modal.date.is.later.than.operand'),
    },
    {
      key: 'is earlier than',
      label: t('create.filter.modal.date.is.earlier.than.operand'),
    },
    {
      key: 'is exactly or later than',
      label: t('create.filter.modal.date.is.exactly.or.later.operand'),
    },
    {
      key: 'is exactly or earlier than',
      label: t('create.filter.modal.date.is.exactly.or.earlier.operand'),
    },
    {
      key: 'is empty',
      label: t('create.filter.modal.date.is.empty.operand'),
    },
    {
      key: 'is not empty',
      label: t('create.filter.modal.date.is.not.empty.operand'),
    },
  ]

  const userOperands = [
    ...basicOperands,
    {
      key: 'belongs to team',
      label: t('create.filter.modal.date.belongs.to.team.operand'),
    },
  ]

  const stringOperands = [
    ...basicOperands,
    {
      key: 'contains',
      label: t('create.filter.modal.date.contains.operand'),
    },
    {
      key: 'does not contain',
      label: t('create.filter.modal.date.does.not.contain.operand'),
    },
    {
      key: 'start with',
      label: t('create.filter.modal.date.start.with.operand'),
    },
    {
      key: 'does not start with',
      label: t('create.filter.modal.date.does.not.start.with.operand'),
    },
    {
      key: 'ends with',
      label: t('create.filter.modal.date.end.with.operand'),
    },
    {
      key: 'does not end with',
      label: t('create.filter.modal.date.does.not.end.with.operand'),
    },
  ]

  const numberOperands = [
    ...basicOperands,
    {
      key: 'is more than',
      label: t('create.filter.modal.date.is.more.than.operand'),
    },
    {
      key: 'is less than',
      label: t('create.filter.modal.date.is.less.than.operand'),
    },
    {
      key: 'is more or equal to',
      label: t('create.filter.modal.date.is.more.or.equal.to.operand'),
    },
    {
      key: 'is less or equal to',
      label: t('create.filter.modal.date.is.less.or.equal.to.operand'),
    },
  ]

  const manageOperandBasedOnColumn = {
    'Add time': dateOperands,
    'Assigned to user': userOperands,
    'Client name': basicOperands,
    Creator: userOperands,
    'Lead name': basicOperands,
    Done: basicOperands,
    Type: basicOperands,
    Subject: stringOperands,
    'Due date': dateOperands,
    'Free/busy': basicOperands,
    Status: basicOperands,
    'Lead email': stringOperands,
    'Lead phone': stringOperands,
    'Lead created date': dateOperands,
    'Won time': dateOperands,
    'Lead owner': userOperands,
    'Lead closed on': dateOperands,
    'Lead done activities': numberOperands,
    'First activity time': dateOperands,
    'Lead last activity date': dateOperands,
    'Lead last activity (days)': numberOperands,
    'Lead lost reason': stringOperands,
    'Lead total activities': numberOperands,
    'Lead lost time': dateOperands,
    'Lead source': basicOperands,
    'Won by': userOperands,
    'Lead stage': basicOperands,
    // 'Lead descriptions': stringOperands,
    'Lead status': basicOperands,
    'Date of entering stage': dateOperands,
    'Lead creator': userOperands,
    Pipeline: basicOperands,
    Title: basicOperands,
    'Update time': dateOperands,
    'Activities to do': numberOperands,
    'Next activity date': dateOperands,
    'Last email received': dateOperands,
    'Last email sent': dateOperands,
    'Email messages count': numberOperands,
    Location: basicOperands,
  }

  const dateMenu = [
    {
      groupName: t('create.filter.modal.date.menu.relative.group.name'),
      groupOption: [
        {
          key: 'last quarter',
          label: t(
            'create.filter.modal.date.menu.relative.option.last.quarter'
          ),
        },
        {
          key: 'this quarter',
          label: t(
            'create.filter.modal.date.menu.relative.option.this.quarter'
          ),
        },
        {
          key: 'last month',
          label: t('create.filter.modal.date.menu.relative.option.last.month'),
        },
        {
          key: 'this month',
          label: t('create.filter.modal.date.menu.relative.option.this.month'),
        },
        {
          key: 'last week',
          label: t('create.filter.modal.date.menu.relative.option.last.week'),
        },
        {
          key: 'this week',
          label: t('create.filter.modal.date.menu.relative.option.this.week'),
        },
        {
          key: 'next week',
          label: t('create.filter.modal.date.menu.relative.option.next.week'),
        },
        {
          key: 'next month',
          label: t('create.filter.modal.date.menu.relative.option.next.month'),
        },
      ],
    },
    {
      groupName: t('create.filter.modal.date.menu.relative.date.group.name'),
      groupOption: [
        {
          key: '6 months ago',
          label: t('create.filter.modal.date.menu.relative.date.option.month', {
            count: 6,
          }),
        },
        {
          key: '5 months ago',
          label: t('create.filter.modal.date.menu.relative.date.option.month', {
            count: 5,
          }),
        },
        {
          key: '4 months ago',
          label: t('create.filter.modal.date.menu.relative.date.option.month', {
            count: 4,
          }),
        },
        {
          key: '3 months ago',
          label: t('create.filter.modal.date.menu.relative.date.option.month', {
            count: 3,
          }),
        },
        {
          key: '2 months ago',
          label: t('create.filter.modal.date.menu.relative.date.option.month', {
            count: 2,
          }),
        },
        {
          key: '1 months ago',
          label: t('create.filter.modal.date.menu.relative.date.option.month', {
            count: 1,
          }),
        },
        {
          key: '3 weeks ago',
          label: t('create.filter.modal.date.menu.relative.date.option.week', {
            count: 3,
          }),
        },
        {
          key: '2 weeks ago',
          label: t('create.filter.modal.date.menu.relative.date.option.week', {
            count: 2,
          }),
        },
        {
          key: '1 weeks ago',
          label: t('create.filter.modal.date.menu.relative.date.option.week', {
            count: 1,
          }),
        },
        {
          key: 'yesterday',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.yerterday'
          ),
        },
        {
          key: 'before today',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.before.today'
          ),
        },
        {
          key: 'today',
          label: t('create.filter.modal.date.menu.relative.date.option.today'),
        },
        {
          key: 'now',
          label: t('create.filter.modal.date.menu.relative.date.option.now'),
        },
        {
          key: 'today or later',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.today.later'
          ),
        },
        {
          key: 'before tomorrow',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.before.tomorrow'
          ),
        },
        {
          key: 'tomorrow',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.tomorrow'
          ),
        },
        {
          key: 'tomorrow or later',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.tomorrow.later'
          ),
        },
        {
          key: 'in 1 week',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.week',
            {
              count: 1,
            }
          ),
        },
        {
          key: 'in 2 weeks',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.weeks',
            {
              count: 2,
            }
          ),
        },
        {
          key: 'in 3 weeks',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.weeks',
            {
              count: 3,
            }
          ),
        },
        {
          key: 'in 1 month',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.month',
            {
              count: 1,
            }
          ),
        },
        {
          key: 'in 2 months',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.months',
            {
              count: 2,
            }
          ),
        },
        {
          key: 'in 3 months',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.months',
            {
              count: 3,
            }
          ),
        },
        {
          key: 'in 4 months',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.months',
            {
              count: 4,
            }
          ),
        },
        {
          key: 'in 5 months',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.months',
            {
              count: 5,
            }
          ),
        },
        {
          key: 'in 6 months',
          label: t(
            'create.filter.modal.date.menu.relative.date.option.in.months',
            {
              count: 6,
            }
          ),
        },
      ],
    },
  ]

  const statusMenu = [
    {
      id: 'pending',
      name: t('create.filter.modal.status.pending'),
    },
    {
      id: 'working_on',
      name: t('create.filter.modal.status.workingOn'),
    },
    {
      id: 'reopened',
      name: t('create.filter.modal.status.reopened'),
    },
    {
      id: 'done',
      name: t('create.filter.modal.status.done'),
    },
    {
      id: 'awaiting',
      name: t('create.filter.modal.status.awaiting'),
    },
  ]

  const visibilityMenuOption = [
    {
      value: 'private',
      label: t('create.filter.modal.private.visibility.label'),
      description: t('create.filter.modal.private.visibility.desc'),
    },
    {
      value: 'shared',
      label: t('create.filter.modal.shared.visibility.label'),
      description: t('create.filter.modal.shared.visibility.desc'),
    },
  ]

  const freeBusyOption = [
    {
      id: '1',
      name: t('create.filter.modal.free.label'),
    },
    {
      id: '0',
      name: t('create.filter.modal.busy.label'),
    },
  ]

  const leadStatusOption = [
    {
      id: 'Open',
      name: t('create.filter.modal.open.lead.status'),
    },
    {
      id: 'Converted',
      name: t('create.filter.modal.won.lead.status'),
    },
    {
      id: 'Junk',
      name: t('create.filter.modal.lost.lead.status'),
    },
  ]

  const doneOption = [
    {
      id: 'To do',
      name: t('create.filter.modal.toDo.label'),
    },
    {
      id: 'Done',
      name: t('create.filter.modal.done.label'),
    },
  ]

  return {
    visibilityMenuOption,
    statusMenu,
    dateMenu,
    manageOperandBasedOnColumn,
    activityItemNames,
    activity,
    freeBusyOption,
    doneOption,
    activityTypeMapper,
    leadStatusOption,
  }
}
