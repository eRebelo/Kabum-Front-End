import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import helmetLogo from '../../assets/imgs/helmet-logo.png';

class StarQuizHome extends Component {
    render() {
        return (
            <div className='helmet-home-div'>
                <img className='helmet-home-img' src={helmetLogo} alt='Star Wars Helmet' />
                <h1 className='starquiz-home-label'>StarQuiz</h1>
                <button type='button' className='btn btn-clear' onClick={() => { hashHistory.push('/game') }} >Jogar</button>
            </div>
        )
    }
}

export default StarQuizHome;