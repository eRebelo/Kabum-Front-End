import React, { Component } from 'react';
import Modal from 'react-modal';

class CustomerRemoveModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true
        }
    }

    /* Function that performs an action when to press a key */
    keyHandler = (e) => {
        if (e.key === 'Enter') {
            this.confirm();
        } else if (e.key === 'Escape') {
            this.close();
        }
    }

    close = () => {
        this.setState({ showModal: false });
        this.props.closeModal();
    }

    confirm = () => {
        this.setState({ showModal: false });
        this.props.confirmAction();
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
                width: '600px'
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
                            <h5 className='modal-title'>Deseja remover o cliente abaixo?</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.close}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>

                        <div className='modal-body'>
                            <div className='row'>
                                <div className='form-group col-md-12'>
                                    <p>
                                        <span className='span-failure-modal'>Nome:</span>
                                        <b> {this.props.name}</b>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary btn-sm' data-dismiss='modal' onClick={this.close}>Cancelar</button>
                            <button type='button' className='btn btn-dark btn-sm' data-dismiss='modal' onClick={this.confirm}>Remover</button>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default CustomerRemoveModal;