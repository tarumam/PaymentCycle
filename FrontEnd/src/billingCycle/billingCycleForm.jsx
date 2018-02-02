import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import labelAndInput from '../common/Form/labelAndInput'

class BillingCycleForm extends Component {
    render() {
        const { handleSubmit } = this.props

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} label='Nome' cols='12 4' placeHolder='Informe o Nome' />
                    <Field name='month' component={labelAndInput} type='number' label='Nome' cols='12 4' placeHolder='Informe o Nome' />
                    <Field name='year' component={labelAndInput} type='number' label='Ano' cols='12 4' placeHolder='Informe o ano' />
                </div>
                <div className='box-footer'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        )
    }
}

export default reduxForm({ form: 'billingCycleForm' })(BillingCycleForm)
