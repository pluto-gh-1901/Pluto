import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
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
