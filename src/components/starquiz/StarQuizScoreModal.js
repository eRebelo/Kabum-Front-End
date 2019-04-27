import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { reduxForm, Field } from 'redux-form'
import { hashHistory } from 'react-router';
import { Popover } from 'react-bootstrap'
import { cleanScoreForm } from './starQuizActions';

const required = value => (!value || !value.length) ? 'Campo obrigatório' : undefined;
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Email inválido' : undefined;

const renderTextField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => (
    <div>
        <input {...input} {...rest} label={label} type={type} placeholder={placeholder} className={'form-control ' + (touched && error ? 'error-input' : '')} />
        {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
    </div>
);

class StarQuizScoreModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            errors: false
        }
    }

    componentWillMount() {
        this.props.cleanScoreForm();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.invalid) {
            this.setState({ errors: true });
        } else {
            this.setState({ errors: false });
        }
    }

    onSubmit = (values) => {
        this.setState({ showModal: false });
        this.props.confirmForm(values);
    }

    playAgain = () => {
        this.setState({ showModal: false });
        this.props.playAgain();
    }

    gameExit = () => {
        this.setState({ showModal: false });
        hashHistory.push('/home');
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
            <Modal
                isOpen={this.state.showModal}
                className='modal-dialog'
                style={customStyles}
                ariaHideApp={false} >

                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>StarQuiz Finalizado!</h4>
                    </div>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-md-12 final-score'>
                                <label>{this.props.finalScore} pontos</label>
                            </div>
                        </div>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className='row'>
                                <div className='col-md-12 msg-score'>
                                    <label>Preencha os campos abaixo para salvar sua pontuação:</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <label htmlFor='name'>Nome*</label>
                                    <Field name='name' component={renderTextField} validate={required} className='form-control' id='name' placeholder='Nome' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <label htmlFor='email'>Email*</label>
                                    <Field name='email' component={renderTextField} validate={[required, email]} className='form-control' id='email' placeholder='Email' />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='modal-footer'>
                        <div className='row'>
                            <button type='button' className='btn btn-secondary btn-score-play-again' data-dismiss='modal' onClick={this.playAgain}>Jogar Novamente</button>
                            <button type='button' className='btn btn-secondary btn-score' data-dismiss='modal' onClick={this.gameExit}>Sair</button>
                            <button type='submit' className='btn btn-dark btn-score' onClick={this.props.handleSubmit(this.onSubmit)}>Salvar</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ cleanScoreForm }, dispatch)
}

StarQuizScoreModal = reduxForm({ form: 'starQuizScoreForm', destroyOnUnmount: false })(StarQuizScoreModal);

export default connect(mapStateToProps, mapDispatchToProps)(StarQuizScoreModal);
