const filterOperand = new Set([
  'is empty',
  'is not',
  'does not contain',
  'does not start with',
  'does not end with',
])
const filterDataIndex = new Set(['client', 'lead'])

export const getColumnData = (column: string, data = {}, operand = '') => {
  const filterMapper = {
    'Add time': {
      key: 'Date',
      type: 'string',
      dataIndex: 'activity',
      filter: {
        created_at: data,
      },
    },
    'Assigned to user': {
      key: 'User',
      type: 'string',
      dataIndex: 'activity',
      filter: {
        assigned_to: data,
      },
    },
    'Client name': {
      key: 'Basic',
      type: 'number',
      dataIndex: 'client',
      filter: {
        CmContact: {
          ID: data,
        },
      },
    },
    Creator: {
      key: 'User',
      type: 'string',
      dataIndex: 'activity',
      filter: {
        created_by: data,
      },
    },
    'Lead name': {
      key: 'Basic',
      type: 'number',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          ID: data,
        },
      },
    },
    Done: {
      key: 'Done',
      type: 'string',
      dataIndex: 'activity',
      filter: {
        status: data,
      },
    },
    Type: {
      key: 'Basic',
      type: 'number',
      dataIndex: 'activity',
      filter: {
        type: data,
      },
    },
    Subject: {
      key: 'Name',
      type: 'string',
      dataIndex: 'activity',
      filter: {
        subject: data,
      },
    },
    'Due date': {
      key: 'Date',
      type: 'string',
      dataIndex: 'activity',
      filter: {
        due_start_date: data,
      },
    },
    'Free/busy': {
      key: 'Basic',
      type: 'boolean',
      dataIndex: 'activity',
      filter: {
        available: data,
      },
    },
    Status: {
      key: 'Basic',
      type: 'string',
      dataIndex: 'activity',
      filter: {
        status: data,
      },
    },
    'Lead owner': {
      key: 'User',
      type: 'string',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          OwnerID: data,
        },
      },
    },
    'Lead email': {
      key: 'Name',
      type: 'string',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          Email: data,
        },
      },
    },
    'Lead phone': {
      key: 'Name',
      type: 'string',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          Phone: data,
        },
      },
    },
    'Lead created date': {
      key: 'Date',
      type: 'string',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          CreatedDate: data,
        },
      },
    },
    'Won time': {
      key: 'Date',
      type: 'string',
      dataIndex: 'lead',
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
      dataIndex: 'lead',
      filter: {
        CmLead: {
          ConvertDate: data,
        },
      },
    },
    'Lead source': {
      key: 'Basic',
      type: 'number',
      dataIndex: 'lead',
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
      dataIndex: 'lead',
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
      dataIndex: 'lead',
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
      dataIndex: 'lead',
      filter: {
        CmLead: {
          EnumStatus: data,
        },
      },
    },
    'Lead creator': {
      key: 'User',
      type: 'string',
      dataIndex: 'lead',
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
      dataIndex: 'lead',
      filter: {
        CmLead: {
          ContactID: data,
        },
      },
    },
    'Date of entering stage': {
      key: 'Date',
      type: 'string',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          ConvertDate: data,
        },
      },
    },
    Pipeline: {
      key: 'Basic',
      type: 'number',
      dataIndex: 'lead',
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
      dataIndex: 'lead',
      filter: {
        CmLead: {
          ID: data,
        },
      },
    },
    'Update time': {
      key: 'Date',
      type: 'string',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          LastUpdated: data,
        },
      },
    },
    Location: {
      key: 'Basic',
      type: 'number',
      dataIndex: 'lead',
      filter: {
        CmLead: {
          location_id: data,
        },
      },
    },
  }
  const columnData = filterMapper?.[column]
  if (
    operand &&
    filterDataIndex.has(columnData.dataIndex) &&
    filterOperand.has(operand)
  ) {
    columnData.filter = {
      OR: [
        { ...columnData.filter },
        columnData.dataIndex === 'client'
          ? { contact_id: { equals: null } }
          : { lead_id: { equals: null } },
      ],
    }
    return columnData
  }
  return columnData
}
