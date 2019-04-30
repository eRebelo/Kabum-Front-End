import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Popover, Collapse } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';

import { addCustomerToForm, addCustomer, editCustomer, validateCPF } from '../customerActions'

const required = value => (!value || !value.length) ? 'Campo obrigatório' : undefined;
const renderTextField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => (
    <div>
        <input {...input} {...rest} label={label} type={type} placeholder={placeholder} className={'form-control ' + (touched && error ? 'error-input' : '')} />
        {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
    </div>
);
const renderSelectField = ({ input, meta: { touched, error }, children, ...rest }) => (
    <div>
        <div>
            <select {...input} {...rest} className={'form-control ' + (touched && error ? 'error-input' : '')}>
                {children}
            </select>
            {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
        </div>
    </div>
);
const cpf = value => (value && !validateCPF(value)) ? 'CPF inválido' : undefined;
const cpfMask = createTextMask({ pattern: '999.999.999-99', guide: false });
const cepMask = createTextMask({ pattern: '99999-999', guide: false });

class CustomerFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            errors: false,
            openAddressToggle: true,
            openHistoricToggle: true,
            listCustomerAddress: [],
            streetAddress: '',
            number: '',
            neighborhood: '',
            state: '',
            city: '',
            zipCode: '',
            complement: ''
        }
    }

    componentWillMount() {
        if (this.props.formState === 'FORM_EDIT') {
            var copyCustomerToEdit = JSON.parse(JSON.stringify(this.props.customerToEdit));

            // Convert the date and time format
            copyCustomerToEdit.birthDate = this.convertToFriendlyDateFormat(copyCustomerToEdit.birthDate);
            copyCustomerToEdit.creationDate = this.convertToFriendlyDateTimeFormat(copyCustomerToEdit.creationDate);
            copyCustomerToEdit.changeDate = this.convertToFriendlyDateTimeFormat(copyCustomerToEdit.changeDate);

            // Set the customer addresses object
            this.setState({ listCustomerAddress: copyCustomerToEdit.customerAddresses });

            // Initializing form
            this.props.addCustomerToForm(copyCustomerToEdit);
        }
        // Building the select options for State
        this.createStateOptions();
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

    convertToFriendlyDateFormat = (originalDate) => {
        let dates = originalDate.split("T");
        return dates[0];
    }

    convertToFriendlyDateTimeFormat = (originalDate) => {
        let time2Date1 = originalDate.split("+");
        let timesDate2 = time2Date1[0].split("T");
        let date = timesDate2[0].split("-");
        originalDate = date[2] + "/" + date[1] + "/" + date[0] + " " + timesDate2[1];
        return originalDate;
    }

    convertToOriginalDateTimeFormat = (originalDate) => {
        let timesDate1 = originalDate.split(" ");
        let timesDate2 = timesDate1[0].split("/");
        originalDate = timesDate2[2] + "-" + timesDate2[1] + "-" + timesDate2[0] + "T" + timesDate1[1];
        return originalDate;
    }

    createStateOptions = () => {
        this.selectState = [
            { value: 'AC', text: 'Acre' },
            { value: 'AL', text: 'Alagoas' },
            { value: 'AP', text: 'Amapá' },
            { value: 'AM', text: 'Amazonas' },
            { value: 'BA', text: 'Bahia' },
            { value: 'CE', text: 'Ceará' },
            { value: 'DF', text: 'Distrito Federal' },
            { value: 'ES', text: 'Espírito Santo' },
            { value: 'GO', text: 'Goiás' },
            { value: 'MA', text: 'Maranhão' },
            { value: 'MT', text: 'Mato Grosso' },
            { value: 'MS', text: 'Mato Grosso do Sul' },
            { value: 'MG', text: 'Minas Gerais' },
            { value: 'PA', text: ' Pará ' },
            { value: 'PB', text: 'Paraíba' },
            { value: 'PR', text: 'Paraná' },
            { value: 'PE', text: 'Pernambuco' },
            { value: 'PI', text: 'Piauí' },
            { value: 'RJ', text: 'Rio de Janeiro' },
            { value: 'RN', text: 'Rio Grande do Norte' },
            { value: 'RS', text: 'Rio Grande do Sul' },
            { value: 'RO', text: 'Rondônia' },
            { value: 'RR', text: 'Roraima' },
            { value: 'SC', text: 'Santa Catarina' },
            { value: 'SP', text: 'São Paulo' },
            { value: 'SE', text: 'Sergipe' },
            { value: 'TO', text: 'Tocantins' }
        ];
    }

    // Adding a new customer address
    pushCustomerAddress = () => {
        if (this.state.streetAddress.trim() !== '' && this.state.number.trim() !== '' && this.state.neighborhood.trim() !== ''
            && this.state.state.trim() !== '' && this.state.city.trim() !== '' && this.state.zipCode.trim() !== '') {

            let tempListCustomerAddress = this.state.listCustomerAddress;
            tempListCustomerAddress.push({
                streetAddress: this.state.streetAddress.trim(),
                number: parseInt(this.state.number.trim()),
                neighborhood: this.state.neighborhood.trim(),
                state: this.state.state.trim(),
                city: this.state.city.trim(),
                zipCode: this.state.zipCode.trim(),
                complement: this.state.complement.trim()
            });
            this.setState({ listCustomerAddress: tempListCustomerAddress });

            // Clean state and fields value of the customer address
            this.setState({ streetAddress: '', number: '', neighborhood: '', state: '', city: '', zipCode: '', complement: '' });
            this.props.change('streetAddress', '');
            this.props.change('number', '');
            this.props.change('neighborhood', '');
            this.props.change('state', '');
            this.props.change('city', '');
            this.props.change('zipCode', '');
            this.props.change('complement', '');
        }
    }

    removeCustomerAddress = (index) => {
        let tempListCustomerAddress = this.state.listCustomerAddress;
        tempListCustomerAddress.splice(index, 1);
        this.setState({ listCustomerAddress: tempListCustomerAddress });
    }

    onSubmit = (values) => {
        if (this.props.formState === 'FORM_ADD') {
            this.setState({ showModal: false });
            this.props.confirmForm();
            this.props.addCustomer({ ...values, customerAddresses: this.state.listCustomerAddress, changedBy: this.props.username });
        } else {
            values.creationDate = this.convertToOriginalDateTimeFormat(values.creationDate);
            values.changeDate = this.convertToOriginalDateTimeFormat(values.changeDate);

            this.setState({ showModal: false })
            this.props.confirmForm();
            this.props.editCustomer({ ...values, changedBy: this.props.username });
        }
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
                                        <Field id='birthDate' name='birthDate' className='form-control' placeholder='Data de Nascimento' component={renderTextField}
                                            type='date' validate={required} />
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

                                <div className='row'>
                                    <div className='col-md-12 col-lg-12'>
                                        <h5 className='heading'>Endereço
                                            <div className='btn btn-default pull-right historic-button' onClick={() => this.setState({ openAddressToggle: !this.state.openAddressToggle })}>
                                                {this.state.openAddressToggle ? (<span className='fa fa-chevron-up'></span>) : <span className='fa fa-chevron-down'></span>}
                                            </div>
                                        </h5>
                                    </div>
                                </div>
                                <Collapse in={this.state.openAddressToggle}>
                                    <div>
                                        <div className='row'>
                                            <div className='form-group col-md-12'>
                                                <div className="history_box_group">
                                                    {this.state.listCustomerAddress.map((item, key) => {
                                                        return (
                                                            <div className='row history_row' key={key}>
                                                                <div className='form-group col-md-11 col-float-right'>
                                                                    <p>{item.streetAddress}, {item.number}{item.complement !== '' ? ' (' + item.complement + ')' : null} - {item.neighborhood}, {item.city} - {item.state}, {item.zipCode}</p>
                                                                </div>
                                                                <div className=' form-group col-md-1 col-float-left'>
                                                                    <button type='button' className='btn btn-danger ctm-address-rm-btn' onClick={() => this.removeCustomerAddress(key)}>
                                                                        <i className='fa fa-times'></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='form-group col-md-9'>
                                                <Field id='streetAddress' name='streetAddress' className='form-control' placeholder='Logradouro*' component={renderTextField}
                                                    value={this.state.streetAddress} onChange={e => this.setState({ streetAddress: e.target.value })} />
                                            </div>
                                            <div className='form-group col-md-3'>
                                                <Field id='number' name='number' className='form-control' placeholder='Número*' component={renderTextField} type="number"
                                                    value={this.state.number} onChange={e => this.setState({ number: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='form-group col-md-4'>
                                                <Field id='complement' name='complement' className='form-control' placeholder='Complemento' component={renderTextField}
                                                    value={this.state.complement} onChange={e => this.setState({ complement: e.target.value })} />
                                            </div>
                                            <div className='form-group col-md-4'>
                                                <Field id='zipCode' name='zipCode' className='form-control' placeholder='CEP*' component={renderTextField} {...cepMask}
                                                    value={this.state.zipCode} onChange={e => this.setState({ zipCode: e.target.value })} />
                                            </div>
                                            <div className='form-group col-md-4'>
                                                <Field id='neighborhood' name='neighborhood' className='form-control' placeholder='Bairro*' component={renderTextField}
                                                    value={this.state.neighborhood} onChange={e => this.setState({ neighborhood: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='form-group col-md-6'>
                                                <Field id='city' name='city' className='form-control' placeholder='Cidade*' component={renderTextField}
                                                    value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
                                            </div>
                                            <div className='form-group col-md-6'>
                                                <Field id='state' name='state' className='form-control' component={renderSelectField}
                                                    value={this.state.state} onChange={e => this.setState({ state: e.target.value })}>
                                                    <option value='' disabled={true}>Selecione um Estado*</option>
                                                    {this.selectState.map((e, key) => {
                                                        return <option key={key} value={e.value}>{e.text}</option>;
                                                    })}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='form-group col-md-12'>
                                                <button type='button' className='btn btn-secondary ctm-address-btn' onClick={() => this.pushCustomerAddress()}>
                                                    <i className='fa fa-plus'></i>&nbsp;&nbsp;Endereço
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>

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
            </div >
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