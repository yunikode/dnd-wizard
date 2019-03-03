import * as React from 'react'
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DropdownProps, Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'

import { getRaces, getClasses, resultsToDropdown } from '../functions/api'

const basicInfoSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is too short').required('Name is requried'),
  mainClass: Yup.string().required('Class is requried'),
  mainRace: Yup.string().required('Race is requried')
})

interface Props {
  onComplete: (values: Partial<Character>) => any
}

interface State {
  classOptions: DropdownProps[],
  raceOptions: DropdownProps[],
  character: Partial<Character>
}

export class BasicInfo extends React.Component<Props, State>{
  state = {
    classOptions: [],
    raceOptions: [],
    character: {
      name: '',
      mainClass: '',
      mainRace: ''
    }
  }

  async componentDidMount() {
    const classOptions = resultsToDropdown(await getClasses())
    const raceOptions = resultsToDropdown(await getRaces())

    this.setState({ classOptions, raceOptions })
  }

  handleSubmit = (e: any) => {
    this.props.onComplete(e)
  }

  render() {
    const { character, classOptions, raceOptions } = this.state
    return (
      <>
        <h2>Basic Information</h2>
        <Formik
          initialValues={character}
          validationSchema={basicInfoSchema}
          onSubmit={this.handleSubmit}
          render={({ isSubmitting, isValid }) => <Form>
            <Field name='name' render={({ field }: FieldProps) => <span className="p-float-label" style={{ marginTop: '1rem' }}>
              <InputText id="name" {...field} style={{ width: '100%' }} />
              <label htmlFor="name">Enter Name</label>
            </span>} />
            <ErrorMessage name='name' />

            <Field name='mainRace' render={
              ({ field }: { field: any }) => <Dropdown {...field} options={raceOptions} placeholder='Select Race' style={{ width: '100%', marginTop: '1rem' }} />
            } />
            <ErrorMessage name='mainRace' />

            <Field name='mainClass' render={
              ({ field }: { field: any }) => <Dropdown {...field} options={classOptions} placeholder='Select Class'
                style={{ width: '100%', marginTop: '1rem' }} />
            } />
            <ErrorMessage name='mainClass' />

            <button type='submit' disabled={isSubmitting || !isValid}>Submit</button>
          </Form>}
        />
      </>

    )
  }
}
