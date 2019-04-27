import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { reduxForm, Field } from 'redux-form'
import { Popover } from 'react-bootstrap'
import { cleanCharacterForm } from './starQuizActions';

const required = value => (!value || !value.length) ? 'Campo obrigatório' : undefined;

const renderTextField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => (
    <div>
        <input {...input} {...rest} label={label} type={type} placeholder={placeholder} className={'form-control ' + (touched && error ? 'error-input' : '')} />
        {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
    </div>
);

class StarQuizCharacterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            errors: false
        }
    }

    componentWillMount() {
        this.props.cleanCharacterForm();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.invalid) {
            this.setState({ errors: true });
        } else {
            this.setState({ errors: false });
        }
    }

    /* Function that performs an action when to press a key */
    keyHandler = (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    close = () => {
        this.setState({ showModal: false })
        this.props.cancelCharacterModal();
    }

    onSubmit = (values) => {
        this.setState({ showModal: false });
        this.props.confirmForm(values);
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
                outline: 'none'
            }
        };
        return (
            <div onKeyUp={this.keyHandler}>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    className='modal-dialog'
                    style={customStyles}
                    ariaHideApp={false} >

                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>Inserir Personagem</h4>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.close}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <div className='row'>
                                    <div className='form-group col-md-12'>
                                        <label htmlFor='name'>Nome*</label>
                                        <Field name='name' component={renderTextField} validate={required} className='form-control' id='name' placeholder='Nome' />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className='modal-footer'>
                            <div className='row'>
                                <button type='button' className='btn btn-secondary btn-character' data-dismiss='modal' onClick={this.close}>Cancelar</button>
                                <button type='submit' className='btn btn-dark btn-character'
                                    onClick={this.props.handleSubmit(this.onSubmit)}>Adicionar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ cleanCharacterForm }, dispatch)
}

StarQuizCharacterModal = reduxForm({ form: 'starQuizCharacterForm', destroyOnUnmount: false })(StarQuizCharacterModal);

export default connect(mapStateToProps, mapDispatchToProps)(StarQuizCharacterModal);
