import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultState = {
  products: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})

/**
 * THUNK CREATORS
 */
export const requestProducts = () => async dispatch => {
  try {
    console.log('running')
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const requestProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, selectedProduct: action.product}
    case GET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}
