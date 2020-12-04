import { types } from './types'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export const handleGetProducts = () => dispatch => {
    dispatch(handleSetLoading())
    axios
        .get(`${BASE_URL}/api/products`)
        .then(function(response) {
            dispatch({
                type: types.GET_PRODUCTS,
                payload: response.data,
            })
            dispatch(handleRemoveLoading())
        })
        .catch(function(error) {
            const { message } = error.response
            alert('there is some error')
        })
}

export const handleGetBasketItems = () => dispatch => {
    const cart = localStorage.getItem('cart')
    axios
        .post(`${BASE_URL}/api/products`, {cart})
        .then(function(response) {
            dispatch({
                type: types.GET_BASKET_ITEMS,
                payload: response.data,
            })
        })
        .catch(function(error) {
			alert('there is some error')
        })
}

export const handleSetLoading = () => dispatch => {
    dispatch({
        type: types.SET_LOADING
    })
}

export const handleRemoveLoading = () => dispatch => {
    dispatch({
        type: types.REMOVE_LOADING
    })
}