import { types } from '../actions/types'

const initialState = {
    products: [],
    basket: [],
    basket_count: 0,
    loading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
        case types.GET_BASKET_ITEMS:
            return {
                ...state,
                basket: action.payload,
                basket_count: action.payload.length,
            }
        case types.SET_LOADING:
            return {
                ...state,
                loading: true,
            }
        case types.REMOVE_LOADING:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
