import React, { Component } from 'react'
import { hashHistory } from 'react-router';

class Ranking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            scores: []
        };
    }

    componentWillMount() {
        let localScores = JSON.parse(localStorage.getItem("scores") || "[]");

        // Sort scores object
        localScores.sort(function (obj1, obj2) {
            return obj2.score - obj1.score;
        });
        this.setState({ scores: localScores });
    }

    render() {
        const { scores } = this.state;

        const renderRows = () => {
            return scores.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.score}</td>
                </tr >
            ))
        }

        return (
            <div className='col-md-12'>
                <div className='container container-ranking'>
                    <div className='row data-table'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>Posição</th>
                                    <th scope='col'>Nome</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Pontuação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <button type='button' className='btn btn-play-ranking' onClick={() => { hashHistory.push('/game') }} >Jogar Novamente</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default Ranking;