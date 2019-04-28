import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table';
import moment from 'moment';

import Loading from '../../loading/Loading'
import { signout } from '../login/loginActions';
import { getCustomerList } from '../customer/customerActions';

const tableHeaderStyle = { fontWeight: 'bold', textAlign: 'left' };
const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(String(row[id]).toLowerCase()).includes(filter.value.toLowerCase()) : true
}
const filterDate = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined ? moment(filter.value).isSame(row[id].slice(0, 10)) : false;
}

class CustomerNavbar extends Component {

    render() {
        return (
            <div className='ctm-header-container'>
                <div className='row'>
                    <div className='col-md-10'>
                        <h1 className='ctm-header-txt'>Cadastro de Clientes</h1>
                    </div>
                    <div className='col-md-2'>
                        <button type='button' className='btn btn-dark ctm-header-btn' onClick={this.props.signout}>
                            <i className='fa fa-sign-out'></i>&nbsp;&nbsp;Sair
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

class Customer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageSize: Math.floor((window.innerHeight - 400) / 38),
        }
    }

    componentWillMount() {
        this.props.getCustomerList();
    }

    componentDidMount() {
        this.updatePageSize();
        window.addEventListener('resize', this.updatePageSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePageSize);
    }

    updatePageSize = () => {
        const pageSize = Math.floor((window.innerHeight - 500) / 38);
        this.setState({ pageSize: pageSize > 8 ? pageSize : 8 });
    }

    render() {

        const columns = [
            {
                filterable: true,
                Header: 'Nome',
                accessor: 'name',
                headerStyle: tableHeaderStyle
            },
            {
                filterable: true,
                Header: 'CPF',
                accessor: 'cpf',
                headerStyle: tableHeaderStyle
            },
            {
                filterable: true,
                Header: 'RG',
                accessor: 'rg',
                headerStyle: tableHeaderStyle
            },
            {
                filterable: true,
                Header: 'Data de Nascimento',
                accessor: 'birthDate',
                headerStyle: tableHeaderStyle,
                filterMethod: filterDate,
                Filter: ({ filter, onChange }) => (
                    <input
                        style={{ width: '100%' }}
                        type="date"
                        onChange={event => onChange(event.target.value)}
                        value={filter ? filter.value : ""}
                    />),
                Cell: row => row.original.birthDate ? moment.utc(row.original.birthDate).format('DD/MM/YYYY') : null
            },
            {
                filterable: false,
                Header: 'Ações',
                accessor: 'actions',
                headerStyle: tableHeaderStyle,
                Cell: row => {
                    return (
                        <div>
                            <button className='btn btn-xs action-buttons ctm-table-button'
                                title='Alterar' /* onClick={() => { this.setState({ failureDetails: row.original, showFailureDetails: true }) }} */>
                                <i className='fa fa-edit'></i>
                            </button>
                            <button className='btn btn-xs action-buttons ctm-table-button'
                                title='Remover' /* onClick={() => { this.setState({ failureDetails: row.original, showFailureDetails: true }) }} */>
                                <i className='fa fa-trash-o'></i>
                            </button>
                        </div>
                    )
                }
            }
        ];

        return (
            <div className='container'>

                {this.props.loading && <Loading {...this.props.loading} />}

                <CustomerNavbar {...this.props} />

                <div className="panel">
                    <div className="panel-body">
                        <div className="panel-body-header">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <button type='button' className='btn btn-dark ctm-header-table-btn' /* onClick={this.props.signout} */>
                                        <i className='fa fa-plus'></i>&nbsp;&nbsp;Adicionar
                                     </button>
                                    <button type='button' className='btn btn-dark ctm-header-table-btn' onClick={() => this.props.getCustomerList()}>
                                        <i className='fa fa-refresh'></i>&nbsp;&nbsp;Atualizar
                                     </button>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='row data-table'>
                                <ReactTable
                                    data={this.props.customerList}
                                    columns={columns}
                                    className='-striped'
                                    style={{ height: '100%' }}
                                    showPageSizeOptions={false}
                                    pageSize={this.state.pageSize}
                                    defaultFilterMethod={filterCaseInsensitive}
                                    previousText={'Anterior'}
                                    nextText={'Próximo'}
                                    loadingText={'Carregando...'}
                                    noDataText={'Nenhum registro encontrado'}
                                    pageText={'Página'}
                                    ofText={'de'}
                                    rowsText={'Linhas'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.login.loggedUser,
        username: state.login.loggedUsername,
        loading: state.customer.loading,
        customerList: state.customer.list
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signout, getCustomerList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)