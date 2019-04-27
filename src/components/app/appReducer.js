import consts from '../../main/consts'
import mock from '../../mock/starQuizImages'

const INITIAL_STATE = {
    charactersNextPage: consts.API_URL,
    characters: [],
    homeworld: [],
    films: [],
    vehicles: [],
    species: [],
    images: [],
    loggedUser: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'STARQUIZ_CHAR_NEXTPAGE':
            return { ...state, charactersNextPage: action.payload }
        case 'STARQUIZ_CHARACTERS':
            return { ...state, characters: state.characters.concat(action.payload) }
        case 'STARQUIZ_HOMEWORLD': {
            for (let i = 0; i < state.characters.length; i++) {
                if (state.characters[i].name === action.payload.name) {
                    state.characters[i].homeworld = action.payload.homeworld;
                }
            }
            return { ...state, homeworld: state.homeworld.concat(action.payload) }
        }
        case 'STARQUIZ_FILMS': {
            for (let i = 0; i < state.characters.length; i++) {
                if (state.characters[i].name === action.payload.name) {
                    for (let j = 0; j < state.characters[i].films.length; j++) {
                        if (state.characters[i].films[j] === action.payload.url) {
                            state.characters[i].films[j] = action.payload.film;
                        }
                    }
                }
            }
            return { ...state, films: state.films.concat(action.payload) }
        }
        case 'STARQUIZ_VEHICLES': {
            for (let i = 0; i < state.characters.length; i++) {
                if (state.characters[i].name === action.payload.name) {
                    for (let j = 0; j < state.characters[i].vehicles.length; j++) {
                        if (state.characters[i].vehicles[j] === action.payload.url) {
                            state.characters[i].vehicles[j] = action.payload.vehicle;
                        }
                    }
                }
            }
            return { ...state, films: state.films.concat(action.payload) }
        }
        case 'STARQUIZ_SPECIES': {
            for (let i = 0; i < state.characters.length; i++) {
                if (state.characters[i].name === action.payload.name) {
                    for (let j = 0; j < state.characters[i].species.length; j++) {
                        if (state.characters[i].species[j] === action.payload.url) {
                            state.characters[i].species[j] = action.payload.specie;
                        }
                    }
                }
            }
            return { ...state, films: state.films.concat(action.payload) }
        }
        case 'STARQUIZ_IMAGES': {
            for (let i = 0; i < state.characters.length; i++) {
                for (let j = 0; j < mock.length; j++) {
                    if (state.characters[i].name === mock[j].name) {
                        state.characters[i].url = mock[j].image;
                        break;
                    }
                }
            }
            return { ...state, images: mock }
        }

        case 'LOGGED_USER':
            return { ...state, loggedUser: action.payload }
        default:
            return state
    }
}