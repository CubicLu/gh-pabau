import { Field, Form, Formik } from 'formik'

interface FormProps {
  pin: string
}

interface P {
  onSubmit(data: FormProps & P['data']): void
  data?: Record<string, any>
}

export const PinScreenStep = ({ onSubmit, data }: P) => (
  <>
    <h2>Thank you! Please hand me back.</h2>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <Formik
      initialValues={{ pin: '' }}
      validate={(values) => {
        const errors = {} as any
        if (!values.pin) {
          errors.testString = 'Required'
        }
        return errors
      }}
      onSubmit={(values) => {
        //here we simluate a server hit..
        setTimeout(() => {
          onSubmit?.({ ...values, pin_user_id: 12344 })
        }, 1400)
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {errors && (
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          )}
          <label htmlFor="testString">Enter PIN</label>
          <Field name="pin" placeholder="PIN" />
          <input type="submit" disabled={!touched} />
        </Form>
      )}
    </Formik>
  </>
)
