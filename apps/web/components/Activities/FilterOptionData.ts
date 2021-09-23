export const getData = (t) => {
  const activity = [
    {
      key: 'Activity',
      label: t('create.filter.modal.activity.option.label'),
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
    {
      key: 'belongs to team',
      label: t('create.filter.modal.date.belongs.to.team.operand'),
    },
  ]

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

  const stringOperands = [
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
      id: 'Pending',
      name: t('create.filter.modal.status.pending'),
    },
    {
      id: 'Working on',
      name: t('create.filter.modal.status.workingOn'),
    },
    {
      id: 'Reopened',
      name: t('create.filter.modal.status.reopened'),
    },
    {
      id: 'Done',
      name: t('create.filter.modal.status.done'),
    },
    {
      id: 'Awaiting',
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
      id: 'Free',
      name: t('create.filter.modal.free.label'),
    },
    {
      id: 'Busy',
      name: t('create.filter.modal.busy.label'),
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
  }
}
