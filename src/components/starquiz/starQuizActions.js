import { initialize } from 'redux-form';

const INITIAL_VALUE_CHARACTER_FORM = {
    name: null
}

const INITIAL_VALUE_SCORE_FORM = {
    name: null,
    email: null
}

export const cleanCharacterForm = () => {
    return initialize('starQuizCharacterForm', INITIAL_VALUE_CHARACTER_FORM)
}

export const cleanScoreForm = () => {
    return initialize('starQuizScoreForm', INITIAL_VALUE_SCORE_FORM)
}