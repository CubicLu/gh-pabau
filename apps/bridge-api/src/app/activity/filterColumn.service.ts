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
    'Lead owner': {
      key: 'User',
      type: 'string',
      filter: {
        CmLead: {
          OwnerID: data,
        },
      },
    },
    'Lead email': {
      key: 'Name',
      type: 'string',
      filter: {
        CmLead: {
          Email: data,
        },
      },
    },
    'Lead phone': {
      key: 'Name',
      type: 'string',
      filter: {
        CmLead: {
          Phone: data,
        },
      },
    },
    'Lead created date': {
      key: 'Date',
      type: 'string',
      filter: {
        CmLead: {
          CreatedDate: data,
        },
      },
    },
    'Won time': {
      key: 'Date',
      type: 'string',
      filter: {
        CmLead: {
          EnumStatus: { equals: 'Converted' },
          ConvertDate: data,
        },
      },
    },
    'Lead closed on': {
      key: 'Date',
      type: 'string',
      filter: {
        CmLead: {
          ConvertDate: data,
        },
      },
    },
    'Lead source': {
      key: 'Basic',
      type: 'number',
      filter: {
        CmLead: {
          MarketingSource: {
            id: data,
          },
        },
      },
    },
    'Won by': {
      key: 'User',
      type: 'string',
      filter: {
        CmLead: {
          EnumStatus: { equals: 'Converted' },
          User: { id: data },
        },
      },
    },
    'Lead stage': {
      key: 'Basic',
      type: 'number',
      filter: {
        CmLead: {
          LeadStatusData: {
            id: data,
          },
        },
      },
    },
    'Lead status': {
      key: 'Basic',
      type: 'string',
      filter: {
        CmLead: {
          EnumStatus: data,
        },
      },
    },
    'Lead creator': {
      key: 'User',
      type: 'string',
      filter: {
        CmLead: {
          CmContact: {
            OwnerID: data,
          },
        },
      },
    },
    'Lead client': {
      key: 'Basic',
      type: 'number',
      filter: {
        CmLead: {
          ContactID: data,
        },
      },
    },
    'Date of entering stage': {
      key: 'Date',
      type: 'string',
      filter: {
        CmLead: {
          ConvertDate: data,
        },
      },
    },
    Pipeline: {
      key: 'Basic',
      type: 'number',
      filter: {
        CmLead: {
          PipelineStage: {
            pipeline_id: data,
          },
        },
      },
    },
    Title: {
      key: 'Basic',
      type: 'number',
      filter: {
        CmLead: {
          ID: data,
        },
      },
    },
    'Update time': {
      key: 'Date',
      type: 'string',
      filter: {
        CmLead: {
          LastUpdated: data,
        },
      },
    },
    Location: {
      key: 'Basic',
      type: 'number',
      filter: {
        CmLead: {
          location_id: data,
        },
      },
    },
  }
  return filterMapper?.[column]
}
