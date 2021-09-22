export const activity = [
  {
    key: 'Activity',
    label: 'Activity',
  },
]

export const activityItemNames = [
  {
    key: 'Add time',
    label: 'Add time',
  },
  {
    key: 'Assigned to user',
    label: 'Assigned to user',
  },
  {
    key: 'Client name',
    label: 'Client',
  },
  {
    key: 'Creator',
    label: 'Creator',
  },
  {
    key: 'Lead name',
    label: 'Lead',
  },
  {
    key: 'Done',
    label: 'Done',
  },
  {
    key: 'Type',
    label: 'Type',
  },
  {
    key: 'Subject',
    label: 'Subject',
  },
  {
    key: 'Due date',
    label: 'Due Date',
  },
  {
    key: 'Free/busy',
    label: 'Free/busy',
  },
  {
    key: 'Status',
    label: 'Status',
  },
]

const dateOperands = [
  {
    key: 'is',
    label: 'is',
  },
  {
    key: 'is not',
    label: 'is not',
  },
  {
    key: 'is later than',
    label: 'is later than',
  },
  {
    key: 'is earlier than',
    label: 'is earlier than',
  },
  {
    key: 'is exactly or later than',
    label: 'is exactly or later than',
  },
  {
    key: 'is exactly or earlier than',
    label: 'is exactly or earlier than',
  },
  {
    key: 'is empty',
    label: 'is empty',
  },
  {
    key: 'is not empty',
    label: 'is not empty',
  },
]

const userOperands = [
  {
    key: 'is',
    label: 'is',
  },
  {
    key: 'is not',
    label: 'is not',
  },
  {
    key: 'is empty',
    label: 'is empty',
  },
  {
    key: 'is not empty',
    label: 'is not empty',
  },
  {
    key: 'belongs to team',
    label: 'belongs to team',
  },
]

const basicOperands = [
  {
    key: 'is',
    label: 'is',
  },
  {
    key: 'is not',
    label: 'is not',
  },
  {
    key: 'is empty',
    label: 'is empty',
  },
  {
    key: 'is not empty',
    label: 'is not empty',
  },
]

const stringOperands = [
  {
    key: 'is',
    label: 'is',
  },
  {
    key: 'is not',
    label: 'is not',
  },
  {
    key: 'is empty',
    label: 'is empty',
  },
  {
    key: 'is not empty',
    label: 'is not empty',
  },
  {
    key: 'contains',
    label: 'contains',
  },
  {
    key: 'does not contain',
    label: 'does not contain',
  },
  {
    key: 'start with',
    label: 'start with',
  },
  {
    key: 'does not start with',
    label: 'does not start with',
  },
  {
    key: 'ends with',
    label: 'ends with',
  },
  {
    key: 'does not end with',
    label: 'does not end with',
  },
]

export const manageOperandBasedOnColumn = {
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

export const dateMenu = [
  {
    groupName: 'Relative date intervals',
    groupOption: [
      {
        key: 'last quarter',
        label: 'last quarter',
      },
      {
        key: 'this quarter',
        label: 'this quarter',
      },
      {
        key: 'last month',
        label: 'last month',
      },
      {
        key: 'this month',
        label: 'this month',
      },
      {
        key: 'last week',
        label: 'last week',
      },
      {
        key: 'this week',
        label: 'this week',
      },
      {
        key: 'next week',
        label: 'next week',
      },
      {
        key: 'next month',
        label: 'next month',
      },
    ],
  },
  {
    groupName: 'Relative dates',
    groupOption: [
      {
        key: '6 months ago',
        label: '6 months ago',
      },
      {
        key: '5 months ago',
        label: '5 months ago',
      },
      {
        key: '4 months ago',
        label: '4 months ago',
      },
      {
        key: '3 months ago',
        label: '3 months ago',
      },
      {
        key: '2 months ago',
        label: '2 months ago',
      },
      {
        key: '1 months ago',
        label: '1 months ago',
      },
      {
        key: '3 weeks ago',
        label: '3 weeks ago',
      },
      {
        key: '2 weeks ago',
        label: '2 weeks ago',
      },
      {
        key: '1 weeks ago',
        label: '1 weeks ago',
      },
      {
        key: 'yesterday',
        label: 'yesterday',
      },
      {
        key: 'before today',
        label: 'before today',
      },
      {
        key: 'today',
        label: 'today',
      },
      {
        key: 'now',
        label: 'now',
      },
      {
        key: 'today or later',
        label: 'today or later',
      },
      {
        key: 'before tomorrow',
        label: 'before tomorrow',
      },
      {
        key: 'tomorrow',
        label: 'tomorrow',
      },
      {
        key: 'tomorrow or later',
        label: 'tomorrow or later',
      },
      {
        key: 'in 1 week',
        label: 'in 1 week',
      },
      {
        key: 'in 2 weeks',
        label: 'in 2 weeks',
      },
      {
        key: 'in 3 weeks',
        label: 'in 3 weeks',
      },
      {
        key: 'in 1 month',
        label: 'in 1 month',
      },
      {
        key: 'in 2 months',
        label: 'in 2 months',
      },
      {
        key: 'in 3 months',
        label: 'in 3 months',
      },
      {
        key: 'in 4 months',
        label: 'in 4 months',
      },
      {
        key: 'in 5 months',
        label: 'in 5 months',
      },
      {
        key: 'in 6 months',
        label: 'in 6 months',
      },
    ],
  },
]

export const statusMenu = [
  {
    id: 'Pending',
    name: 'Pending',
  },
  {
    id: 'Working on',
    name: 'Working on',
  },
  {
    id: 'Reopened',
    name: 'Reopened',
  },
  {
    id: 'Done',
    name: 'Done',
  },
  {
    id: 'Awaiting',
    name: 'Awaiting',
  },
]

export const visibilityMenuOption = [
  {
    value: 'private',
    label: 'Private',
    description: 'Only the creator can see this filter',
  },
  {
    value: 'shared',
    label: 'Shared',
    description: 'All users in the company can see and use this filter',
  },
]
