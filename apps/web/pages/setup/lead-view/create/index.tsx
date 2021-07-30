import { gql } from '@apollo/client'
import { Breadcrumb, Button, Checkbox, Input } from '@pabau/ui'
import { Col, Form as AntForm, Row, Typography } from 'antd'
import classNames from 'classnames'
import { Formik, FormikErrors } from 'formik'
import MobileHeader from '../../../../components/MobileHeader'
import useWindowSize from '../../../../hooks/useWindowSize'
import React, { FC, useState } from 'react'
import Layout from '../../../../components/Layout/Layout'
import FieldRow from '../../../../components/Setup/LeadView/FieldRow'
import styles from './index.module.less'

const { Title } = Typography

interface LeadSchema extends Schema {
  input: SchemaItem
  fields: Record<string, LeadSchemaItem>
}

interface LeadSchemaItem extends SchemaItem {
  advance?: AdvanceField
  input?: SchemaItem
}

interface AdvanceField {
  selectOptions?: TypeValues[]
}

interface TypeValues {
  label: string
  value: string
}

const ADD_MUTATION = gql`
  mutation MyMutation {
    insert_lead_one(
      object: {
        email: "nido_i@hotmail.com"
        interest: "xyz"
        is_active: true
        age: 30
        name: "aysha"
        owner: "rulaa"
        source: "xyz"
        location: "gilgit"
        order: 2
        phone: "45455545454"
        status: "true"
        id: "123e4567-e89b-12d3-a456-426614174011"
      }
    ) {
      email
      id
      is_active
      order
      age
      interest
      name
      owner
      source
      status
      location
      phone
      status
    }
  }
`

export const LeadCreateView: FC<LeadSchema> = () => {
  const size = useWindowSize()
  const [schema, setSchema] = useState<LeadSchema>({
    full: 'Create Lead View',
    fullLower: 'create lead view',
    short: 'Lead',
    shortLower: 'lead',
    createButtonLabel: 'Create',
    messages: {
      create: {
        success: 'New leads created.',
        error: 'While creating leads',
      },
      update: {
        success: '',
        error: '',
      },
      delete: {
        success: '',
        error: '',
      },
    },
    input: {
      full: 'Name',
      type: 'string',
      example: 'eg. London View',
    },
    fields: {
      name: {
        full: 'Lead Name',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
      },
      email: {
        full: 'Email',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
      },
      phone: {
        full: 'Phone',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
      },
      age: {
        full: 'Lead Age',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
      },
      created_at: {
        full: 'Created Date',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
        input: {
          full: 'Name',
          type: 'string',
          example: '',
        },
        advance: {
          selectOptions: [
            {
              label: 'is',
              value: 'is',
            },
          ],
        },
      },
      location: {
        full: 'Location',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
        advance: {
          selectOptions: [
            {
              label: 'equal',
              value: 'equal',
            },
            {
              label: 'any',
              value: 'any',
            },
          ],
        },
      },
      owner: {
        full: 'Lead owner',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
        advance: {
          selectOptions: [
            {
              label: 'equal',
              value: 'equal',
            },
            {
              label: 'any',
              value: 'any',
            },
          ],
        },
      },
      status: {
        full: 'Lead status',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
        advance: {
          selectOptions: [
            {
              label: 'equal',
              value: 'equal',
            },
            {
              label: 'any',
              value: 'any',
            },
          ],
        },
      },
      source: {
        full: 'Lead Source',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
        advance: {
          selectOptions: [
            {
              label: 'equal',
              value: 'equal',
            },
            {
              label: 'any',
              value: 'any',
            },
          ],
        },
      },
      interest: {
        full: 'Interest',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: true,
            inactive: true,
            active: false,
          },
        },
        advance: {
          selectOptions: [
            {
              label: 'equal',
              value: 'equal',
            },
            {
              label: 'any',
              value: 'any',
            },
          ],
        },
      },
      is_active: {
        full: 'Active',
        type: 'checkbox',
        defaultvalue: false,
        filter: {
          primary: {
            name: 'Filter',
            type: 'string',
            default: false,
            inactive: true,
            active: false,
          },
        },
      },
    },
  })

  const handleAddField = (selectedItem) => {
    Object.entries(schema.fields).map((field, i) => {
      if (field[1].full.toLowerCase() === selectedItem.full.toLowerCase()) {
        setSchema({
          ...schema,
          fields: {
            ...schema.fields,
            [field[0]]: {
              ...selectedItem,
              advance: {
                selectOptions: [
                  ...selectedItem.advance.selectOptions,
                  {
                    label: 'not equal',
                    value: 'not equal',
                  },
                ],
              },
            },
          },
        })
      }
      return 1
    })
  }

  const createNew = () => {
    console.log('new')
  }

  const formikFields = () => {
    const initialValues = {}
    if (schema) {
      Object.keys(schema.fields).map((field, i) => {
        initialValues[field] = checkFieldType(
          schema.fields[field]['type'],
          schema.fields[field]['defaultvalue']
        )
        return field
      })
    }
    return initialValues
  }

  const checkFieldType = (type: string, defaultVal) => {
    switch (type) {
      case 'string':
      case 'color-picker':
      case 'radio-group':
        return defaultVal || ''
      case 'boolean':
      case 'checkbox':
        return defaultVal || true
      case 'number':
        return defaultVal || 0
      default:
        return defaultVal || ''
    }
  }

  return (
    <Layout>
      <Formik
        enableReinitialize={true}
        validate={(e) => {
          if (schema) {
            Object.entries(schema.fields).reduce((a, c) => {
              if (
                c[1].required &&
                c[1].min && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                c[1].min > e[c[0]].length
              ) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                a[c[0]] = `Required ${c[1].full}.`
              }
              return a
              // eslint-disable-next-line
          }, {} as FormikErrors<any>)
          }
        }}
        onSubmit={(values, { resetForm }) => {
          console.log('formik onsubmit', values)
          // onSubmit(values, { resetForm })
        }}
        //initialValues={typeof modalShowing === 'object' ? modalShowing : undefined}
        initialValues={formikFields()}
        // requiredMark={required}
      >
        <div className={styles.leadsViewCreatePage}>
          <MobileHeader
            parent="/setup/lead-view"
            title={schema.full || schema.short}
          >
            {ADD_MUTATION && (
              <Checkbox
                defaultChecked={false}
                onClick={() => {
                  // setSpecialBoolean((e) => !e)
                }}
              >
                {schema?.fields?.is_active?.full}
              </Checkbox>
            )}
          </MobileHeader>
          <div
            className={classNames(
              styles.tableMainHeading,
              styles.mobileViewNone
            )}
          >
            <div style={{ background: '#FFF' }}>
              <Breadcrumb
                items={[
                  { breadcrumbName: 'Setup', path: 'setup' },
                  {
                    breadcrumbName: schema.full || schema.short,
                    path: 'setup/lead-view',
                  },
                  {
                    breadcrumbName: schema.full,
                    path: 'setup/lead-view/create',
                  },
                ]}
              />
              <Title>{schema.full || schema.short}</Title>
            </div>
            {ADD_MUTATION && (
              <div
                className={classNames(
                  styles.marketingSource,
                  styles.mobileViewNone
                )}
              >
                <Checkbox
                  defaultChecked={false}
                  onClick={() => {
                    // setSpecialBoolean((e) => !e)
                  }}
                >
                  {schema?.fields?.is_active?.full}
                </Checkbox>
                <Button
                  className={styles.createSourceBtn}
                  type="primary"
                  disabled={true}
                  onClick={createNew}
                >
                  {schema?.createButtonLabel}
                </Button>
              </div>
            )}
          </div>
          <Row className={styles.headNameInput}>
            <Col xs={24} md={12}>
              <AntForm layout={'vertical'} requiredMark={true}>
                <AntForm.Item
                  label={schema?.input?.full}
                  name={schema?.input?.full}
                >
                  <Input
                    name={schema?.input?.full}
                    type={schema?.input?.type}
                    placeHolderText={schema?.input?.example}
                  />
                </AntForm.Item>
              </AntForm>
            </Col>
          </Row>
          <div className={styles.basicInfo}>
            <h6>Primary columns to display</h6>
            <AntForm
              layout={'vertical'}
              requiredMark={true}
              className={styles.leadCreateForm}
            >
              <div className={styles.formBox}>
                {Object.entries(schema.fields).map((item, i) => {
                  return (
                    <div key={i}>
                      <FieldRow field={item} handleAddField={handleAddField} />
                    </div>
                  )
                })}
              </div>
            </AntForm>
            {size.width < 768 && (
              <div className={styles.footer}>
                <Button
                  className={styles.createSourceBtn}
                  type="primary"
                  disabled={true}
                  onClick={createNew}
                >
                  {schema?.createButtonLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Formik>
    </Layout>
  )
}

export default LeadCreateView
