import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StarQuizDetailsModal from './StarQuizDetailsModal'
import StarQuizCharacterModal from './StarQuizCharacterModal'
import StarQuizScoreModal from './StarQuizScoreModal'
import { hashHistory } from 'react-router';
import Pagination from "../../template/Pagination";
import helmetLogo from '../../assets/imgs/helmet-logo.png'
import TimerMachine from 'react-timer-machine'
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format" /* This import can not be removed */

const LIMIT_PER_PAGE = 9;

class StarQuizGame extends Component {

    static initialState = {
        timerStarted: true,
        timerPaused: false,

        allCharacters: [],
        currentCharacters: [],
        currentPage: null,
        totalPages: null,

        showDetailsModal: false,
        characterDetails: null,
        showCharacterModal: false,
        characterIndex: false,
        showScoreModal: false,

        score: [],
        finalScore: null
    }

    constructor(props) {
        super(props)

        this.state = StarQuizGame.initialState;
    }

    componentDidMount() {
        // Parse props to state of the characters
        const tempAllCharacter = this.props.characters;
        const tempScore = [];
        for (let i = 0; i < tempAllCharacter.length; i++) {
            tempAllCharacter[i].edited = false;

            //  Building score oject state
            let buildScore = { name: tempAllCharacter[i].name, answer: null, tip: false }
            tempScore.push(buildScore);
        }
        this.setState({ allCharacters: tempAllCharacter, score: tempScore });
    }

    /* Pagination function */
    onPageChanged = data => {
        const { allCharacters } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentCharacters = allCharacters.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentCharacters, totalPages });
    };

    /* Open modals */
    openModal = (modal, index) => {
        if (modal === 'DETAILS') {
            // Set tip to true on the score
            const tempScore = this.state.score;
            tempScore[index].tip = true;
            this.setState({ timerPaused: true, showDetailsModal: true, characterDetails: this.state.allCharacters[index], score: tempScore });
        } else if (modal === 'CHARACTER') {
            this.setState({ timerPaused: true, showCharacterModal: true, characterIndex: index });
        } else if (modal === 'SCORE') {
            this.scoreCalc();
            this.setState({ showScoreModal: true });
        }
    }

    /* Close modals */
    closeModal = (modal) => {
        if (modal === 'DETAILS') {
            this.setState({ timerPaused: false, showDetailsModal: false, characterDetails: null });
        } else if (modal === 'CHARACTER') {
            this.setState({ timerPaused: false, showCharacterModal: false, characterIndex: null });
        }
    }

    /* Confirm character modal */
    confirmCharacterModal = (values) => {
        // Set edited attribute on the character state
        const tempAllCharacter = this.state.allCharacters;
        tempAllCharacter[this.state.characterIndex].edited = true;

        // Set the answer on the score state
        const tempScore = this.state.score;
        tempScore[this.state.characterIndex].answer = values.name;

        this.setState({ timerPaused: false, showCharacterModal: false, characterIndex: null, allCharacters: tempAllCharacter, score: tempScore });
    }

    /* Confirm score modal */
    confirmScoreModal = (values) => {
        // Get the local storage
        let scores = JSON.parse(localStorage.getItem("scores") || "[]");
        let scoreLength = scores.length;

        // Build the current score
        const newScore = { name: values.name, email: values.email, score: this.state.finalScore }

        // Verifies if already there is score for user and email and if is bigger than last one
        let foundScore = false;
        for (let i = 0; i < scoreLength; i++) {
            if (scores[i].name === values.name && scores[i].email === values.email) {
                if (scores[i].score < this.state.finalScore) {
                    scores[i].score = this.state.finalScore;
                }
                foundScore = true;
                break;
            }
        }
        // If there is not score for the user and email registered adds a new score
        if (!foundScore) {
            scores.push(newScore);
        }

        // Set the scores on the local storage
        localStorage.setItem("scores", JSON.stringify(scores));

        this.setState({ showScoreModal: false });

        hashHistory.push('/ranking');
    }

    /* Calculating the final score */
    scoreCalc = () => {
        let result = 0;

        for (let i = 0; i < this.state.score.length; i++) {
            if (this.state.score[i].answer !== null) {
                if (this.state.score[i].name.toUpperCase() === this.state.score[i].answer.toUpperCase()) {
                    if (this.state.score[i].tip) {
                        result += 10;
                    } else {
                        result += 20;
                    }
                }
            }
        }
        this.setState({ finalScore: result });
    }

    /* Reset the state to play again */
    resetState = () => {
        this.setState(StarQuizGame.initialState);
        this.componentDidMount();
        let totalPages = this.state.allCharacters.length / LIMIT_PER_PAGE;
        this.onPageChanged({ currentPage: 1, pageLimit: LIMIT_PER_PAGE, totalPages: Math.ceil(totalPages), totalRecords: this.state.allCharacters.length });
        window.scrollTo(0, 0);
    }

    render() {
        const { timerStarted, timerPaused, allCharacters, currentCharacters, currentPage, totalPages } = this.state;
        const totalCharacters = allCharacters.length;
        const headerClass = ["text-dark py-2 pr-4 m-0", currentPage ? "border-gray border-right" : ""].join(" ").trim();

        return (
            <div className='container' >

                {totalCharacters !== 0 ? (
                    <div className='container-aux'>
                        {/* Header */}
                        <div className='row'>
                            <div className='col-md-7'>
                                <img className='helmet-game-img' src={helmetLogo} alt='Star Wars Helmet' />
                                <h1 className='starquiz-game-label'>StarQuiz Game!</h1>
                            </div>
                            <div className='col-md-5'>
                                <h1 className='game-timer'><i className="fa fa-clock-o game-clock-icon" />&nbsp;
                                    <TimerMachine
                                        timeStart={120 * 1000} // start at 2 minutes
                                        timeEnd={0} // end at 0 seconds
                                        started={timerStarted}
                                        paused={timerPaused}
                                        countdown={true} // use as stopwatch
                                        interval={1000} // tick every 1 second
                                        formatTimer={(time, ms) =>
                                            moment.duration(ms, "milliseconds").format("h:mm:ss")
                                        }
                                        onComplete={time => this.openModal('SCORE')}
                                        onStop={time => this.setState({ timerPaused: true })}
                                    />
                                </h1>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className='row'>
                            <div className="d-flex flex-row align-items-center total-pages">
                                <h2 className={headerClass}>
                                    <strong className="text-secondary">{totalCharacters}</strong>{" "} Personagens
                                    </h2>
                                {currentPage && (
                                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                        Página <span className="font-weight-bold">{currentPage}</span> /{" "}
                                        <span className="font-weight-bold"> {totalPages}</span>
                                    </span>
                                )}
                            </div>
                            <Pagination
                                totalRecords={totalCharacters}
                                pageLimit={LIMIT_PER_PAGE}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged}
                            />
                        </div>

                        {/* Cards */}
                        <div className='row'>
                            {currentCharacters.map((item, index) => (
                                <div className='col-md-3 card-col' key={index}>
                                    <div className={'card card-custom' + (item.edited ? ' card-answered' : '')}>
                                        <img className='card-img-top' src={item.url} alt='cards' />
                                        <div className='card-body'>
                                            <button type='button' className='btn btn-secondary btn-card' title='Inserir Nome' disabled={item.edited}
                                                onClick={() => this.openModal('CHARACTER', (((currentPage - 1) * LIMIT_PER_PAGE) + index))}>?</button>
                                            <button type='button' className='btn btn-secondary btn-card btn-card-info' title='Detalhes' disabled={item.edited}
                                                onClick={() => this.openModal('DETAILS', (((currentPage - 1) * LIMIT_PER_PAGE) + index))}>...</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div >

                        { /* Character Modal */
                            this.state.showCharacterModal ? (
                                <StarQuizCharacterModal cancelCharacterModal={() => this.closeModal('CHARACTER')} confirmForm={(values) => { this.confirmCharacterModal(values) }} />
                            ) : null
                        }

                        { /* Details Modal */
                            this.state.showDetailsModal ? (
                                <StarQuizDetailsModal cancelDetailsModal={() => this.closeModal('DETAILS')}
                                    character={this.state.characterDetails} />
                            ) : null
                        }

                        { /* Score Modal */
                            this.state.showScoreModal ? (
                                <StarQuizScoreModal playAgain={() => { this.resetState() }} confirmForm={(values) => { this.confirmScoreModal(values) }} finalScore={this.state.finalScore} />
                            ) : null
                        }
                    </div >
                ) : (
                        <div className='row'>
                            <a className='game-label-redirect' href='/#/'>Para jogar retorne a tela inicial</a>
                        </div >
                    )
                }
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        characters: state.app.characters
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StarQuizGame)