import axios from 'axios-https-proxy-fix'
import toastr from 'react-redux-toastr'

export const getCharacters = (apiURL) => {
    return dispatch => {
        axios.get(apiURL).then(resp => {
            dispatch([
                { type: 'STARQUIZ_CHAR_NEXTPAGE', payload: resp.data.next },
                { type: 'STARQUIZ_CHARACTERS', payload: resp.data.results }
            ])
        }).catch(error => {
            toastr.error('Erro', 'Erro ao tentar buscar os personagens Star Wars. ' + error)
        })
    }
}

export const getHomeworld = (characterName, apiURL) => {
    return dispatch => {
        axios.get(apiURL).then(resp => {
            let respData = { name: characterName, homeworld: resp.data.name };
            dispatch([
                { type: 'STARQUIZ_HOMEWORLD', payload: respData }
            ])
        }).catch(error => {
            toastr.error('Erro', 'Erro ao tentar buscar a terra natal dos personagens Star Wars. ' + error)
        })
    }
}

export const getFilms = (characterName, apiURL) => {
    return dispatch => {
        axios.get(apiURL).then(resp => {
            let respData = { name: characterName, url: apiURL, film: resp.data.title };
            dispatch([
                { type: 'STARQUIZ_FILMS', payload: respData }
            ])
        }).catch(error => {
            toastr.error('Erro', 'Erro ao tentar buscar os filmes Star Wars. ' + error)
        })
    }
}

export const getVehicles = (characterName, apiURL) => {
    return dispatch => {
        axios.get(apiURL).then(resp => {
            let respData = { name: characterName, url: apiURL, vehicle: resp.data.name };
            dispatch([
                { type: 'STARQUIZ_VEHICLES', payload: respData }
            ])
        }).catch(error => {
            toastr.error('Erro', 'Erro ao tentar buscar os veículos Star Wars. ' + error)
        })
    }
}

export const getSpecies = (characterName, apiURL) => {
    return dispatch => {
        axios.get(apiURL).then(resp => {
            let respData = { name: characterName, url: apiURL, specie: resp.data.name };
            dispatch([
                { type: 'STARQUIZ_SPECIES', payload: respData }
            ])
        }).catch(error => {
            toastr.error('Erro', 'Erro ao tentar buscar as espécies Star Wars. ' + error)
        })
    }
}

export const setImages = () => {
    return {
        type: 'STARQUIZ_IMAGES'
    }
}