export const getColumnData = (column: string, data = {}) => {
  const filterMapper = {
    'Add time': {
      key: 'Date',
      type: 'string',
      filter: {
        created_at: data,
      },
    },
    'Assigned to user': {
      key: 'User',
      type: 'string',
      filter: {
        AssignedUser: { id: data },
      },
    },
    'Client name': {
      key: 'Basic',
      type: 'number',
      filter: {
        CmContact: {
          ID: data,
        },
      },
    },
    Creator: {
      key: 'User',
      type: 'string',
      filter: {
        User: { id: data },
      },
    },
    'Lead name': {
      key: 'Basic',
      type: 'number',
      filter: {
        CmLead: {
          ID: data,
        },
      },
    },
    Done: {
      key: 'Done',
      type: 'string',
      filter: {
        status: data,
      },
    },
    Type: {
      key: 'Basic',
      type: 'number',
      filter: {
        type: data,
      },
    },
    Subject: {
      key: 'Name',
      type: 'string',
      filter: {
        subject: data,
      },
    },
    'Due date': {
      key: 'Date',
      type: 'string',
      filter: {
        due_start_date: data,
      },
    },
    'Free/busy': {
      key: 'Basic',
      type: 'boolean',
      filter: {
        available: data,
      },
    },
    Status: {
      key: 'Basic',
      type: 'string',
      filter: {
        status: data,
      },
    },
  }
  return filterMapper[column]
}
