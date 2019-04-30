import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Popover, Collapse } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';

import { addCustomerToForm, addCustomer, editCustomer, validateCPF } from '../customerActions'

import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import 'moment/locale/pt-br';
import 'react-widgets/dist/css/react-widgets.css'

moment.locale('pt-br')
momentLocalizer()

const required = value => (!value || !value.length) ? 'Campo obrigatório' : undefined;
const renderTextField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => (
    <div>
        <input {...input} {...rest} label={label} type={type} placeholder={placeholder} className={'form-control ' + (touched && error ? 'error-input' : '')} />
        {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
    </div>
);
const cpf = value => (value && !validateCPF(value)) ? 'CPF inválido' : undefined;
const cpfMask = createTextMask({ pattern: '999.999.999-99', guide: false });

const renderDateTimePicker = ({ input: { onChange, value }, placeholder, showTime }) => (
    <DateTimePicker placeholder={placeholder} onChange={onChange} format="DD/MM/YYYY" time={showTime} value={!value ? null : new Date(value)} />
);

class CustomerFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            errors: false,
            openAddressToggle: true,
            openHistoricToggle: true
        }
    }

    componentWillMount() {
        if (this.props.formState === 'FORM_EDIT') {
            this.props.customerToEdit.creationDate = this.convertToFriendlyDateFormat(this.props.customerToEdit.creationDate);
            this.props.customerToEdit.changeDate = this.convertToFriendlyDateFormat(this.props.customerToEdit.changeDate);

            // Initializing form
            this.props.addCustomerToForm(this.props.customerToEdit);
        }
    }

    /* Function that performs an action when to press a key */
    keyHandler = (e) => {
        if (e.key === 'Enter') {
            this.props.handleSubmit(this.onSubmit);
        } else if (e.key === 'Escape') {
            this.close();
        }
    }

    close = () => {
        this.setState({ showModal: false });
        this.props.cancelForm();
    }

    onSubmit = (values) => {
        console.log(values);

        if (this.props.formState === 'FORM_ADD') {
            this.setState({ showModal: false });
            this.props.confirmForm();
            this.props.addCustomer({ ...values, changedBy: this.props.username });
        } else {
            values.creationDate = this.convertToOriginalDateFormat(values.creationDate);
            values.changeDate = this.convertToOriginalDateFormat(values.changeDate);

            this.setState({ showModal: false })
            this.props.confirmForm();
            this.props.editCustomer({ ...values, changedBy: this.props.username });
        }
    }

    convertToFriendlyDateFormat = (originalDate) => {
        let time2Date1 = originalDate.split("+");
        let timesDate2 = time2Date1[0].split("T");
        let date = timesDate2[0].split("-");
        originalDate = date[2] + "/" + date[1] + "/" + date[0] + " " + timesDate2[1];
        return originalDate;
    }

    convertToOriginalDateFormat = (originalDate) => {
        let timesDate1 = originalDate.split(" ");
        let timesDate2 = timesDate1[0].split("/");
        originalDate = timesDate2[2] + "-" + timesDate2[1] + "-" + timesDate2[0] + "T" + timesDate1[1];
        return originalDate;
    }

    render() {
        const customStyles = {
            overlay: {
                position: 'fixed',
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            },
            content: {
                top: '10%',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                width: '800px'
            }
        };

        return (
            <div onKeyUp={this.keyHandler}>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    className='modal-dialog'
                    style={customStyles}
                    ariaHideApp={false}>

                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{this.props.formModalTitle}</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.close}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>

                        <div className='modal-body'>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

                                <div className='row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='name'>Nome*</label>
                                        <Field id='name' name='name' className='form-control' placeholder='Nome' component={renderTextField} validate={required} />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='birthDate'>Data de Nascimento</label>
                                        <Field id='birthDate' name='birthDate' className='form-control' placeholder='Data de Nascimento' component={renderDateTimePicker} 
                                        showTime={false} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='cpf'>CPF*</label>
                                        <Field id='cpf' name='cpf' className='form-control' placeholder='CPF' component={renderTextField}
                                            validate={[required, cpf]} {...cpfMask} />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='rg'>RG*</label>
                                        <Field id='rg' name='rg' className='form-control' placeholder='RG' component={renderTextField} validate={required} />
                                    </div>
                                </div>

                                {/* <div className='row'>
                                    <div className='col-md-12 col-lg-12'>
                                        <h4 className='heading'>Endereço
                                            <div className='btn btn-default pull-right historic-button' onClick={() => this.setState({ openAddressToggle: !this.state.openAddressToggle })}>
                                                {this.state.openAddressToggle ? (<span className='fa fa-chevron-up'></span>) : <span className='fa fa-chevron-down'></span>}
                                            </div>
                                        </h4>
                                    </div>
                                </div>
                                <Collapse in={this.state.openAddressToggle}>
                                </Collapse> */}

                                {this.props.formState === 'FORM_EDIT' ? (
                                    <div>
                                        <div className='row'>
                                            <div className='col-md-12 col-lg-12'>
                                                <h5 className='heading'>Histórico
                                            <div className='btn btn-default pull-right historic-button' onClick={() => this.setState({ openHistoricToggle: !this.state.openHistoricToggle })}>
                                                        {this.state.openHistoricToggle ? (<span className='fa fa-chevron-up'></span>) : <span className='fa fa-chevron-down'></span>}
                                                    </div>
                                                </h5>
                                            </div>
                                        </div>
                                        <Collapse in={this.state.openHistoricToggle}>
                                            <div className='row'>
                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='creationDate'>Data de Criação</label>
                                                    <Field name='creationDate' component={renderTextField} className='form-control' id='creationDate' disabled={true} />
                                                </div>
                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='changeDate'>Data de Alteração</label>
                                                    <Field name='changeDate' component={renderTextField} className='form-control' id='changeDate' disabled={true} />
                                                </div>
                                                <div className='form-group col-md-4'>
                                                    <label htmlFor='changedBy'>Alterado Por</label>
                                                    <Field name='changedBy' component={renderTextField} className='form-control' id='changedBy' disabled={true} />
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                ) : null}
                            </form>
                        </div>

                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary btn-sm' data-dismiss='modal' onClick={this.close}>Cancelar</button>
                            <button type='submit' className='btn btn-dark btn-sm' onClick={this.props.handleSubmit(this.onSubmit)}>{this.props.formModalButton}</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.login.loggedUsername
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addCustomerToForm, addCustomer, editCustomer }, dispatch)
}

CustomerFormModal = reduxForm({ form: 'customerForm', destroyOnUnmount: false })(CustomerFormModal);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerFormModal);