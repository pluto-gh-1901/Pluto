import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'
const SUBMIT_CART = 'SUBMIT_CART'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const submitCart = order => {
  return {
    type: SUBMIT_CART,
    // user,
    order
  }
}

export const requestCart = id => async dispatch => {
  try {
    const res = await axios.post('/api/users/cart', {userId: id})
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

const defaultCart = {}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}

// fetch order with state cart (for checkout)
export const requestOrder = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/cart`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

// clear cart
export const recieveEmptyCart = () => async dispatch => {
  try {
    dispatch(getCart({}))
  } catch (err) {
    console.error(err)
  }
}
