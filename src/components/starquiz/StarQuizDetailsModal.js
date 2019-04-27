import React, { Component } from 'react'
import Modal from 'react-modal'

class StarQuizDetailsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true
        }
    }

    /* Function that performs an action when to press a key */
    keyHandler = (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    close = () => {
        this.setState({ showModal: false });
        this.props.cancelDetailsModal();
    }

    buildObject = (obj) => {
        let response = '';

        if (obj.length > 0) {
            for (let i = 0; i < obj.length; i++) {
                response += obj[i] + ', ';
            }
            response = response.substring(0, response.length - 2);
        } else {
            response = '---';
        }
        return response;
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
                        <div className='modal-header modal-header-details-modal'>
                            <h4 className='modal-title'>Detalhes</h4>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.close}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body modal-body-details-modal'>
                            <div className='container container-details-modal'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <img className='card-img-top' src={this.props.character.url} alt='card' />
                                    </div>
                                    <div className='col-6'>
                                        <div className='row first-row-details-modal'>
                                            <label className='label-details-modal-subtitle'>Espécie:</label>
                                            <label className='label-details-modal-identity'>{this.buildObject(this.props.character.species)}</label>
                                        </div>
                                        <div className='row'>
                                            <label className='label-details-modal-subtitle'>Altura: </label>
                                            <label className='label-details-modal-identity'>{this.props.character.height}</label>
                                        </div>
                                        <div className='row'>
                                            <label className='label-details-modal-subtitle'>Cabelo: </label>
                                            <label className='label-details-modal-identity'>{this.props.character.hair_color}</label>
                                        </div>
                                        <div className='row'>
                                            <label className='label-details-modal-subtitle'>Planeta: </label>
                                            <label className='label-details-modal-identity'>{this.props.character.homeworld}</label>
                                        </div>
                                        <div className='row'>
                                            <label className='label-details-modal-subtitle'>Veículos: </label>
                                            <label className='label-details-modal-identity'>{this.buildObject(this.props.character.vehicles)}</label>
                                        </div>
                                        <div className='row'>
                                            <label className='label-details-modal-subtitle'>Filmes: </label>
                                            <label className='label-details-modal-identity'>{this.buildObject(this.props.character.films)}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default StarQuizDetailsModal;
